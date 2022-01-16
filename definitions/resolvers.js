const DataLoader = require('dataloader');
const getTeamSpeakService = require('../services/teamspeak');
const tsService = getTeamSpeakService();

const channelLoader = new DataLoader(async (ids) => {
    const channelList = await tsService.getChannelList();
    const filteredChannelList = channelList.filter(channel => ids.includes(channel.id));
    const orderedChannelList = ids.map(key => filteredChannelList.filter(channel => channel.id == key)[0])
    return Promise.resolve(orderedChannelList);
},{ cache:false });

const resolvers = {
    Query: {
        clients: async () => {
            try {
                return await tsService.getClientList();
            } catch (err) {
                console.log(err);
            }
        },
        channels: async () => {
            try {
                return await tsService.getChannelList();
            } catch (err) {
                console.log(err);
            }
        },
        server: async () => {
            try {
                return await tsService.getServer();
            } catch (err) {
                console.log(err);
            }
        }
    },
    Client: {
        channel: async (root) => {
            try {
                return await channelLoader.load(root.channel);
            } catch (err) {
                console.log(err);
            }
        }
    },
}


module.exports = resolvers;