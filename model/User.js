import mongoose from 'mongoose';

const User = new mongoose.Schema({
    id: { type: String, require: true },
    login: { type: String, require: true, minLength: 5, maxLength: 20, trim: true },
    email: { type: String, require: true, minLength: 5, maxLength: 255, trim: true },
    password: { type: String, require: true },
    picture: { type: String, require: true },
});

export default mongoose.model('User', User);