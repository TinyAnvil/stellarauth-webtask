import express from 'express';
import wt from 'webtask-tools';
import { json, urlencoded } from 'body-parser';

import account from './routes/account/_account';

const app = express();

app.use(urlencoded({extended: true}));
app.use(json());
app.use(account);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.response)
    err = err.response;

  if (err.data)
    err = err.data;

  console.error(err);
  res.status(err.status || 500);
  res.json(err);
});

module.exports = wt.fromExpress(app);
