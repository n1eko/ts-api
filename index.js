const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const startServer = require('./graphql');

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

const usersRouter = require('./controllers/users')
const channelsRouter = require('./controllers/channels')
const serversRouter = require('./controllers/servers')

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./docs/openapi.json')));
app.use('/api/clients', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/server', serversRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  startServer();
});