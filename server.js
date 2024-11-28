import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);


mongoose.connect('mongodb+srv://pcrumbines:Ze38tLpePB32Gjpr@project.iulyp.mongodb.net/?retryWrites=true&w=majority&appName=Project') 
   .then(() => {
     console.log('MongoDB connected');
   })
   .catch(err => {
     console.log('Error in MongoDB:', err);
   });



// START THE SERVER
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

export default app;
