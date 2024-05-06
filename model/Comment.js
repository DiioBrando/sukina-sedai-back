import mongoose from 'mongoose';


const Comment = new mongoose.Schema({
    idUser: { type: mongoose.Types.ObjectId, ref: "User" },
    login: { type: String, require: true },
    comment: { type: String, require: true },
});

export default mongoose.model('Comment', Comment);