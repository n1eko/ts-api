const channelsRouter = require('express').Router()
const {TeamspeakService} = require('../services/teamspeak');

const tsService = new TeamspeakService();

channelsRouter.get('/', async (request, response) => {
    const clients = await tsService.getClientList();
    response.json(clients);
})

module.exports = channelsRouter
