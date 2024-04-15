import mongoose from 'mongoose';


const Post = new mongoose.Schema({
    id: { type: String, require: true },
    idComment: { type: String, require: true },
    name: { type: String, require: true },
    year: { type: Number, require: true },
    comment: { type: String, require: true },
    picture: { type: String, require: true},
});

export default mongoose.model('Post', Post);