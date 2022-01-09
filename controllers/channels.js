const channelsRouter = require('express').Router()
const getTeamSpeakService = require('../services/teamspeak');

const tsService = getTeamSpeakService();

channelsRouter.get('/:id', async (request, response, next) => {
const { id } = request.params

await tsService.getChannelInfo(id).then(channelInfo => {
    response.json(channelInfo);})
.catch(err => {
    next(err);
}
);

})


module.exports = channelsRouter
