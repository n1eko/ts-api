const { TeamSpeak, QueryProtocol } = require("ts3-nodejs-library")
const { TS3_HOST, TS3_SERVER_PORT,TS3_QUERY_PORT, TS3_USER, TS3_PASS, TS3_NICK, NODE_ENV} = process.env

class TeamspeakService {

    constructor() {
        console.log("Initializing teamspeak service");

        if(this.client){
            return;
        }

        this.client = new TeamSpeak({
            host: TS3_HOST,
            protocol: QueryProtocol.RAW,
            queryport: TS3_QUERY_PORT,
            serverport: TS3_SERVER_PORT,
            username: TS3_USER,
            password: TS3_PASS,
            nickname: TS3_NICK,
            keepAlive: true
        });

        this.client.on("ready", () => {
            console.log("Teamspeak interface connected and ready!");
        });


        this.client.on("error", (error) => {
            console.error("Error connecting to teamspeak: " + error);
        })
    }
    
    async getClientList() {
        return await this.client.clientList({clientType: 0 })
            .then(rawClientList => {
                return rawClientList.map(rawUser => {
                    const userData = rawUser.propcache;
                    const userJson = {
                        id: userData.clid,
                        name: userData.clientNickname,
                        channel: userData.cid,
                        platform: userData.clientPlatform,
                        isMuted: userData.clientInputMuted,
                        country: userData.clientCountry
                    }
                    return userJson;
                });
            });
    }
    
    
    async getChannelInfo(id) {
        return await this.client.channelInfo(id).
        then(rawChannelInfo => {
            const channelData = rawChannelInfo;
            const channelJson = {
                name: channelData.channelName,
                capacity: channelData.channelMaxclients,
                isSecured: channelData.channelFlagPassword
            }
            return channelJson;
        });
    }

}

const teamspeakservice = new TeamspeakService();

function getTeamSpeakService() {
    return teamspeakservice;
}

module.exports = getTeamSpeakService;