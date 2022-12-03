const logsRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

logsRouter.get('/', async (request, response) => {
    await tsService.getLastConnectionsFromLog().then(log => {
        response.json(log);})
    .catch(err => next(err));
})

module.exports = logsRouter
