import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);


mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    console.log('MongoDB connected');
    console.log(`Server is running on port 27017`);
  })
  .catch(err => console.log(err));
