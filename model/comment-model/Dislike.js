import mongoose from 'mongoose';

const Dislike = new mongoose.Schema({
    idUser: { type: mongoose.Types.ObjectId, require: true, },
    login: { type: String, require: true, },
});


export default mongoose.model('Dislike', Dislike);