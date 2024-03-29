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
                    const user = rawUser.propcache;
                    return {
                        id: user.clid,
                        name: user.clientNickname,
                        channel: user.cid,
                        platform: user.clientPlatform,
                        isMuted: user.clientInputMuted,
                        hasOutputMuted: user.clientOutputMuted,
                        country: user.clientCountry,
                        lastConnectedDate: user.clientLastconnected
                    }
                });
            });
    }
    
    
    async getChannelInfo(id) {
        return await this.client.channelInfo(id).
        then(channel => {
            return {
                id: channel.cid,
                name: channel.channelName,
                capacity: channel.channelMaxclients,
                hasPassword: channel.channelFlagPassword
            }
        });
    }
    
    
    async getChannelList() {
        return await this.client.channelList()
            .then(rawChannelList => {
                const channelList = rawChannelList.map(rawChannel => {
                    const channel = rawChannel.propcache;
                    return {
                        id: channel.cid,
                        name: channel.channelName,
                        capacity: channel.channelMaxclients,
                        hasPassword: channel.channelFlagPassword
                    }
                });
                return channelList;
            });
    }
    
    
    async getLastConnectionsFromLog() {
        return await this.client.logView(100, 1, 0, 0)
        .then((log) => {
            return log.filter((logEntry) => {
                return logEntry.l.includes("connected") && !logEntry.l.includes("query")
            }).map(logEntry => {
                const matches = logEntry.l.match(/(.*)\..*\|INFO.*\'(.*)\'\(id:(.*)\)/);
                return {
                    id: matches[3],
                    user: matches[2],
                    date: matches[1],
                    type: logEntry.l.includes("disconnected") ? 'disconnect' : 'connect'
                }
            });
        });
    }
    
    
    async getServer() {
        return await this.client.serverInfo()
        .then(serverInfo => {
            return {
                id: serverInfo.virtualserverId,
                name: serverInfo.virtualserverName,
                status: serverInfo.virtualserverStatus,
                platform: serverInfo.virtualserverPlatform,
                version: serverInfo.virtualserverVersion,
                maxClients: serverInfo.virtualserverMaxclients,
                clientsOnline: serverInfo.virtualserverClientsonline,
                uptime: serverInfo.virtualserverUptime,
                averagePing: serverInfo.virtualserverTotalPing,
                totalClientConnections: serverInfo.virtualserverClientConnections,
                totalBytesSent: serverInfo.connectionBytesSentTotal,
                totalBytesReceived: serverInfo.connectionBytesReceivedTotal,
            }
        });
    }
}

const teamspeakservice = new TeamspeakService();

function getTeamSpeakService() {
    return teamspeakservice;
}

module.exports = getTeamSpeakService;