require('dotenv-flow').config({ silent: true });

const cors = require('cors');
const express = require('express');

const { errorHandlerMiddleware } = require('./middlewares');
const router = require('./routers');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandlerMiddleware);

module.exports = app;
