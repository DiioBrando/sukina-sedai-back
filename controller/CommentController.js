import CommentService from "../service/CommentService.js";

class CommentController {

    async commentAdd(req, res, next) {
        try {
            const { comment, login } = req.body;
            const userData = await CommentService.commentAdd(comment, login);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async updateComment(req, res, next) {
        try {
            const { comment, login } = req.body;
            const userData = await CommentService.updateComment(comment, login);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}


export default new CommentController();