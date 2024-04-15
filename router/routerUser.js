import Router from 'express';
import PostController from '../controller/post-user/post/PostController.js';

const routerUser = new Router();

routerUser.post('/posts', PostController.create);
routerUser.get('/posts', PostController.getAll);
routerUser.get('/posts/:id', PostController.getOne);
routerUser.put('/posts', PostController.update);
routerUser.delete('/posts/:id', PostController.delete);


export default routerUser;