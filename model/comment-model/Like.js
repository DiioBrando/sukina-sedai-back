import mongoose from 'mongoose';


const Like = new mongoose.Schema({
    idUser: { type: mongoose.Types.ObjectId, require: true, },
    login: { type: String, require: true, },
});


export default mongoose.model('Like', Like);