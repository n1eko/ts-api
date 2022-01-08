const usersRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

usersRouter.get('/', async (request, response) => {
    const clients = await tsService.getClientList();
    response.json(clients);
})

module.exports = usersRouter
