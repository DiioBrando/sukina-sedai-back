import Router from 'express';
import AuthController from '../controller/auth-user/post/AuthController.js';
import { check } from 'express-validator';
import { authMiddlewaree } from '../middlewaree/authMiddlewaree.js';
import { roleMiddlewaree } from '../middlewaree/roleMiddlewaree.js';

const routerUser = new Router();

routerUser.post('/registration', [
    check('login', 'login min length: 4 and max length: 8 and must not be empty -400').isLength({ min: 4, max: 8 }).notEmpty(),
    check('email', 'email min length: 2 and max length: 256 -400').isLength( { min: 2, max: 256 }).notEmpty(),
    check('password', 'password min length: 8 and max length: 20 -400').isLength( { min: 8, max: 20 }).notEmpty(),
] ,AuthController.registration);
routerUser.post('/login', AuthController.login);
routerUser.get('/users', roleMiddlewaree(['moder']), AuthController.getAll);
routerUser.get('/user/:id', AuthController.getOne);
routerUser.put('/user', AuthController.update);
routerUser.delete('/user/:id', AuthController.delete);


export default routerUser;