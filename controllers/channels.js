const channelsRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

channelsRouter.get('/', async (request, response) => {
    const clients = await tsService.getClientList();
    response.json(clients);
})

module.exports = channelsRouter
