import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerUser from './router/routerUser.js';
import { ErrorMiddleware } from "./middlewaree/ErrorMiddleware.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', routerUser);


// middleware для ошибок подключается последним в цепочке
app.use(ErrorMiddleware);

async function startApp(){
    try {
        await mongoose.connect(process.env.MONGO_URL_PATH);
        app.listen(process.env.PORT, () => console.log('Server start'));
    } catch (e) {
        console.log(e);
    }
}

startApp();