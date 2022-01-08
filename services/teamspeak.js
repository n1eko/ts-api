const e = require("express");
const { TeamSpeak, QueryProtocol } = require("ts3-nodejs-library")
const { TS3_HOST, TS3_SERVER_PORT,TS3_QUERY_PORT, TS3_USER, TS3_PASS, TS3_NICK, NODE_ENV} = process.env

class TeamspeakService {

    constructor() {
        console.log("Initializing teamspeak interface");
        console.log("Connecting to teamspeak... ");

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


        this.client.on("clientconnect", ev => {
            let client = ev.client;
            console.log(`Client ${client.nickname} just connected`);
        });


        this.client.on("ready", () => {
            console.log("Teamspeak interface connected and ready!");
        });


        this.client.on("error", (error) => {
            console.error("Error connecting to teamspeak: " + error);
        })
    }
    
    async getClientList() {
        return await this.client.clientList({
            clientType: 0 
        });
    }

}

const teamspeakservice = new TeamspeakService();

function getTeamSpeakService() {
    return teamspeakservice;
}

module.exports = getTeamSpeakService;