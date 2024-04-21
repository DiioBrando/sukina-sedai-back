import Router from 'express';
import UserController from '../controller/auth-user/UserController.js'
import { body } from 'express-validator';

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
routerUser.get('/getAll', UserController.getAll);


export default routerUser;