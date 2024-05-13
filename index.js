import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerUser from './router/routerUser.js';
import { ErrorMiddleware } from "./middlewaree/ErrorMiddleware.js";
import routerComment from "./router/routerComment.js";
import routerInventory from "./router/routerInventory.js";


const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cookieParser('cookieName', 'cookieValue', {
    sameSite: 'lax',
}));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use('/api', routerUser);
app.use('/api', routerComment);
app.use('/api', routerInventory);

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