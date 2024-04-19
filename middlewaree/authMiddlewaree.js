import jwt from "jsonwebtoken";
import { config } from "../config.js";
export const authMiddlewaree = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(403).json({ message: "User is not auth" })
        }
        const decodedDate = jwt.verify(token, config.secretKey);
        req.user = decodedDate;
        next();
    } catch (e) {
        return res.status(403).json({ message: "User is not auth" })
    }
}