import express from 'express';
import mongoose from 'mongoose';
import routerComment from './router/routerComment.js';
import routerUser from "./router/routerUser.js";
import fileUpload from 'express-fileupload';

const PORT = 5001;
const URL_DB = 'mongodb+srv://Maldarka:Maldarka@cluster0.thw2owg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));


app.use('/api/comments', routerComment);
app.use('/api/users', routerUser);

async function startApp(){
    try {
        await mongoose.connect(URL_DB);
        app.listen(PORT, () => console.log('Server start'));
    } catch (e) {
        console.log(e);
    }
}

startApp();