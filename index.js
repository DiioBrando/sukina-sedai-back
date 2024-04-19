import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routerComment from './router/routerComment.js';
import routerUser from './router/routerUser.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cors());

app.use('/api/comments', routerComment);
app.use('/api/users', routerUser);

async function startApp(){
    try {
        await mongoose.connect(process.env.MONGO_URL_PATH);
        app.listen(process.env.PORT, () => console.log('Server start'));
    } catch (e) {
        console.log(e);
    }
}

startApp();