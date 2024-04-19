import jwt from "jsonwebtoken";
import { config } from "../config.js";
export const roleMiddlewaree = (roles) => {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(403).json({ message: "User is not auth" })
            }

            const { roles: userRoles} = jwt.verify(token, config.secretKey);
            let hasRoles = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRoles = true;
                }
            })
            if(!hasRoles) {
                return res.status(403).json({ message: "Access denied" })
            }
            next();
        } catch (e) {
            return res.status(403).json({ message: "User is not auth" })
        }
    }
}