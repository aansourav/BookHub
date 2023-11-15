import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
const app = express();

app.use(express.json());

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
)

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to BookHub');
});

app.use('/books', booksRoute);

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
