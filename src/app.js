require('express-async-errors');
require('dotenv-flow').config({ silent: true });
require('./utils/loadRelationships');

const cors = require('cors');
const express = require('express');

const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./routers');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.use(errorMiddleware);

module.exports = app;
