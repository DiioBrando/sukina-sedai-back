import mongoose from 'mongoose';


const Comment = new mongoose.Schema({
    idUser: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    animeId: { type: String, require: true },
    login: { type: String, require: true, },
    timestamp: { type: String, default: Date.now, },
    changed: { type: Boolean, default: false, },
    comment: { type: String, require: true, },
    like: [{ type: mongoose.Types.ObjectId, ref: "Like", require: true  }],
    dislike: [{ type: mongoose.Types.ObjectId, ref: "Dislike", require: true }],
});

export default mongoose.model('Comment', Comment);