const serversRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

serversRouter.get('/', async (request, response, next) => {
    await tsService.getServer()
        .then(serverInfo => {response.json(serverInfo);})
        .catch(err => {
            next(err);
        }
    );
})

module.exports = serversRouter
