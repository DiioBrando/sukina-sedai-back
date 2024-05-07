import Router from 'express';

import { authMiddleware } from "../middlewaree/authMiddlewaree.js";
import CommentController from "../controller/CommentController.js";

const routerComment = new Router();

routerComment.post('/add-comment', authMiddleware, CommentController.commentAdd);
routerComment.post('/delete-comment', authMiddleware, CommentController.deleteComment);
routerComment.post('/update-comment', authMiddleware, CommentController.updateComment);
routerComment.get('/getAll-comment', CommentController.getAll);


export default routerComment;