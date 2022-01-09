const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/users')
const channelsRouter = require('./controllers/channels')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});