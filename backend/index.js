import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import moviesRoute from './routes/moviesRoute.js';
import usersRoute from './routes/usersRoute.js';
import sessionsRoute from './routes/sessionsRoute.js';
import transactionsRoute from './routes/transactionsRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Cinema Server is working');
  });


app.use('/movie', moviesRoute);
app.use('/user', usersRoute);
app.use('/session', sessionsRoute);
app.use('/transaction', transactionsRoute);

  mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
