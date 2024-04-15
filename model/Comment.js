import mongoose from 'mongoose';


const Comment = new mongoose.Schema({
    id: { type: String, require: true },
    idComment: { type: String, require: true },
    name: { type: String, require: true },
    comment: { type: String, require: true },
});

export default mongoose.model('Comment', Comment);