import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/ApiError.js';
import TokenService from '../service/TokenService.js';
export const authMiddleware = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = req.headers.authorization.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validationAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.UnauthorizedError());
        }
        const decodedDate = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);
        req.user = decodedDate;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}