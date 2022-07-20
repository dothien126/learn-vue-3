require('dotenv').config();

import express from 'express';
import config from 'config';
import morgan from 'morgan';
import cors from 'cors';

import log from './utils/logger';
import connectToDb from './utils/connectDb';
import router from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(deserializeUser);
app.use(router);

const port = config.get('port');
app.get('/', (_, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  log.info(`Server running on ${port}.`);

  connectToDb();
});
