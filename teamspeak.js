const { TeamSpeak, QueryProtocol } = require("ts3-nodejs-library")
const { TS3_HOST, TS3_SERVER_PORT,TS3_QUERY_PORT, TS3_USER, TS3_PASS, TS3_NICK, NODE_ENV} = process.env

function getClient(){
    return this.ts3;
};

function startTeamspeak() {

    console.log("Initializing teamspeak interface");
    console.log("Connecting to teamspeak... ");

    this.ts3 = new TeamSpeak({
        host: TS3_HOST,
        protocol: QueryProtocol.RAW,
        queryport: TS3_QUERY_PORT,
        serverport: TS3_SERVER_PORT,
        username: TS3_USER,
        password: TS3_PASS,
        nickname: TS3_NICK,
        keepAlive: true
    });


    this.ts3.on("clientconnect", ev => {
        let client = ev.client;
        console.log(`Client ${client.nickname} just connected`);
    });


    this.ts3.on("ready", () => {
        console.log("Teamspeak interface connected and ready!");
    });


    this.ts3.on("error", (error) => {
        console.error("Error connecting to teamspeak: " + error);
      })
}

module.exports = {startTeamspeak, getClient};
