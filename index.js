import express  from "express";
import bodyParser  from "body-parser";
import mongoose  from "mongoose";
import cors  from "cors";
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express(); //initializing the app
dotenv.config();


// setting up the bodyParser to post requests
app.use(bodyParser.json({limit : "25mb",extended : true}));
app.use(bodyParser.urlencoded({limit : "25mb",extended : true}));
app.use(cors());

app.use('/posts', postRoutes); 
app.use('/user', userRoutes);

app.get('/', (req,res) => {
    res.send("Welcome to LifeStories API");
})


const PORT = process.env.PORT || 8000;
  
// connecting to db
mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));  