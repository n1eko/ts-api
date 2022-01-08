const usersRouter = require('express').Router()
const {TeamspeakService} = require('../services/teamspeak');

const tsService = new TeamspeakService();

usersRouter.get('/', async (request, response) => {
    const clients = await tsService.getClientList();
    response.json(clients);
})

module.exports = usersRouter
