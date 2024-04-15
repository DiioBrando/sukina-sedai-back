import Router from 'express';
import PostController from './PostController.js';

const routerComment = new Router();

routerComment.post('/posts', PostController.create);
routerComment.get('/posts', PostController.getAll);
routerComment.get('/posts/:id', PostController.getOne);
routerComment.put('/posts', PostController.update);
routerComment.delete('/posts/:id', PostController.delete);


export default routerComment;