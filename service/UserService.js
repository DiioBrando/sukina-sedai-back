import User from '../model/users-model/User.js'
import Role from '../model/users-model/Role.js';
import MailService from './MailService.js';
import TokenService from './TokenService.js';
import bcrypt from 'bcryptjs';
import * as uuid from 'uuid';
import UserDTO from "../dtos/UserDTO.js";
import ApiError from "../exceptions/ApiError.js";

class UserService {
    async registration(login, email, password) {
            if(await User.findOne({ login })) {
                throw ApiError.BadRequest('there is already a user with this name');
            }
            if(await User.findOne({ email })) {
                throw ApiError.BadRequest('there is already a user with this email');
            }
            const hashPass = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "user" } );
            const activationLink = uuid.v4();

            await MailService.sendMailActivation(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const user = await User.create({ login, email, password: hashPass, roles: [userRole.value] , activationLink });

            const userDto = new UserDTO(user);
            const tokens = TokenService.generationToken({ ...userDto });
            await TokenService.saveToken(userDto.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDto,
            }
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if(!user) {
            throw ApiError.BadRequest('User not find with this email');
        }

        const validPass = bcrypt.compareSync(password, user.password);
        if(!validPass) {
            throw ApiError.BadRequest('pass error');
        }

        const userDto = new UserDTO(user);
        const tokens = TokenService.generationToken({ ...userDto });
        console.log(userDto.id)
        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink) {

            const user = await User.findOne({ activationLink });
            if(!user) {
                throw ApiError.BadRequest('Incorrect link');
            }
            user.isActivated = true;
            await user.save();

    }

    async refresh(req, res, next) {

    }
}


export default new UserService();