import Router from 'express';

import { authMiddleware } from '../middlewaree/authMiddlewaree.js';
import CommentController from '../controller/CommentController.js';

const routerComment = new Router();

routerComment.post('/add-comment', authMiddleware, CommentController.commentAdd);
routerComment.delete('/delete-comment/:id', authMiddleware, CommentController.deleteComment);
routerComment.patch('/update-comment/:id', authMiddleware, CommentController.updateComment);
routerComment.get('/getAll-comments', CommentController.getAll);
export default routerComment;