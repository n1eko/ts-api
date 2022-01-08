const usersRouter = require('express').Router()
const {getClient} = require('../teamspeak');

usersRouter.get('/', async (request, response) => {
    const clients = await getClient().clientList({ clientType: 0 });
    response.json(clients);
})

module.exports = usersRouter
