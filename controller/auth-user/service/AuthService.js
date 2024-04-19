import User from '../../../model/users-model/User.js';
import Role from '../../../model/users-model/Role.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { config } from "../../../config.js";

const generateAccessToken = (id, roles) => {
    const payload =  {
        id,
        roles
    }
    return jwt.sign(payload, config.secretKey, {expiresIn: '24h'});
}


class AuthService {
    async registration(post) {
        if(await User.findOne({ login: post.login })) {
            throw new Error('there is already a user with this name -400');
        }
        if(await User.findOne({ email: post.email })) {
            throw new Error('there is already a user with this email -400');
        }

        const hashPass = bcrypt.hashSync(post.password, 7);
        const userRole = await Role.findOne({ value: "user" } );
        const user = await User({...post, password: hashPass, roles: [userRole.value] });
        await user.save();
        return user;
    }

    async login(post) {
        const user = await User.findOne({ email: post.email });
        if(!user) {
            throw new Error(`User not find with this email -400`);
        }
        const validPass = bcrypt.compareSync(post.password, user.password);
        if(!validPass) {
            throw new Error('pass error -400');
        }
        const token = generateAccessToken(user._id, user.roles);
        return token;
    }

    async getAll() {
        const posts = await User.find();
        return posts;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await User.findById(id);
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await User.findByIdAndUpdate(post._id, post, { new: true })
        return updatedPost;
    }
    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await User.findByIdAndDelete(id);
        return post;
    }
}

export default new AuthService();