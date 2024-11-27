import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);


// EDIT THE DATABASE NAME
mongoose.connect('mongodb://localhost:27017/EDITTHIS') 
   .then(() => {
     console.log('MongoDB connected');
   })
   .catch(err => {
     console.log('Error in MondoDB:', err);
   });


// START THE SERVER
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

export default app;

