import Router from 'express';

import { authMiddleware } from '../middlewaree/authMiddlewaree.js';
import CommentController from '../controller/CommentController.js';

const routerComment = new Router();

routerComment.post('/add-comment', authMiddleware, CommentController.commentAdd);
routerComment.delete('/delete-comment/:id', authMiddleware, CommentController.deleteComment);
routerComment.patch('/update-comment/:id', authMiddleware, CommentController.updateComment);
routerComment.get('/getAll-comments', CommentController.getAll);

routerComment.post('/add-like', authMiddleware, CommentController.likeAdd);
routerComment.post('/add-dislike', authMiddleware, CommentController.dislikeAdd);

routerComment.delete('/delete-like', authMiddleware, CommentController.deleteLike);
routerComment.delete('/delete-dislike', authMiddleware, CommentController.deleteDislike);

export default routerComment;