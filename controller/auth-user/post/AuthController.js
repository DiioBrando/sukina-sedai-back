import AuthService from '../service/AuthService.js';
import ErrorHandler from '../../ErrorHandler.js';
import { validationResult } from "express-validator";

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) {
               res.status(400).json({ message: 'Err register', errors})
            }

            await AuthService.registration(req.body);
            return res.json({ message: 'Success register' });
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }

    async login(req, res) {
        try {
            const token = await AuthService.login(req.body);
            return res.json({ token });
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await AuthService.getAll();
            return res.json(posts);
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }
    async getOne(req, res) {
        try {
            const post = await AuthService.getOne(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }
    async update(req, res) {
        try {
            const updatedPost = await AuthService.update(req.body);
            return res.json(updatedPost);
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }
    async delete(req, res) {
        try {
            const post = await AuthService.delete(req.params.id);
            return res.json(post)
        } catch (e) {
            res.status(Number(ErrorHandler.codeErr(e.message))).json({ message: ErrorHandler.messageErr(e.message) });
        }
    }


}

export default new AuthController();