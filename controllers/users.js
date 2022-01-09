const usersRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

usersRouter.get('/', async (request, response) => {
    await tsService.getClientList().then(clientList => {
        response.json(clientList);})
    .catch(err => next(err));
})

module.exports = usersRouter
