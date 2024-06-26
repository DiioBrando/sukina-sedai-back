import mongoose from 'mongoose';

const User = new mongoose.Schema({
    login: { type: String, require: true, unique: true, trim: true, },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, },
    picture: { type: String, require: false },
    roles: [{ type: String, ref: 'Role', }],
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});

export default mongoose.model('User', User);