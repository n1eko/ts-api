require('dotenv').config()
require('./mongo')

const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const validateToken = require('./middleware/validate-jwt.js')

const usersRouter = require('./controllers/users')
const channelsRouter = require('./controllers/channels')
const authRouter = require('./controllers/auth')

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./swagger.json')));
app.use('/api/users', usersRouter)
app.use('/api/channels', validateToken, channelsRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});