import Router from 'express';
import UserController from '../controller/UserController.js'
import { body } from 'express-validator';
import { authMiddleware } from "../middlewaree/authMiddlewaree.js";

const routerUser = new Router();

routerUser.post('/registration',
    body('login').notEmpty(),
    body('email').isEmail().isLength({ min: 2, max: 256 }),
    body('password').notEmpty().isLength({ min: 8, max: 20 })
 ,UserController.registration);
routerUser.post('/login', UserController.login);
routerUser.post('/logout', UserController.logout);
routerUser.get('/activate/:link', UserController.activate);
routerUser.get('/refresh', UserController.refresh);
routerUser.get('/getAll', authMiddleware, UserController.getAll);



export default routerUser;