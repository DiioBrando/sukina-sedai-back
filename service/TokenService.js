import TokenModel from "../model/users-model/token-model.js";
import jwt from 'jsonwebtoken';

class TokenService {
     generationToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '2d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validationAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;

        } catch (e) {
            return null
        }
    }

    validationRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;

        } catch (e) {
            return null
        }
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId } );
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId,  refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();