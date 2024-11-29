import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);


mongoose.connect('mongodb+srv://eegarcia4:BKzML0eDeNytr001@project.iulyp.mongodb.net/project?retryWrites=true&w=majority&appName=Project') 
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
