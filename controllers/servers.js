const serversRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

serversRouter.get('/', async (request, response, next) => {
    await tsService.getServerList()
        .then(serverList => {response.json(serverList);})
        .catch(err => {
            next(err);
        }
    );
})

serversRouter.get('/:id', async (request, response, next) => {
    const { id } = request.params
    await tsService.getServerInfo(id)
        .then(serverInfo => {response.json(serverInfo);})
        .catch(err => {
            next(err);
        }
    );
})

module.exports = serversRouter
