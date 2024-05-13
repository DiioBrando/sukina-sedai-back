import CommentService from "../service/CommentService.js";

class CommentController {

    async commentAdd(req, res, next) {
        try {
            const { _id, animeId, comment} = req.body;
            const userData = await CommentService.commentAdd(comment, _id, animeId);
            return res.json({ message: 'success add' });
        } catch (e) {
            next(e);
        }
    }
    async updateComment(req, res, next) {
        try {
            const { comment } = req.body;
            const _id = req.params.id;
            const userData = await CommentService.updateComment(comment, _id);
            return res.json({ message: 'success update', });
        } catch (e) {
            next(e);
        }
    }
    async deleteComment(req, res, next) {
        try {
            const _id = req.params.id;
            const userData = await CommentService.deleteComment(_id);
            return res.json({ message: 'success delete' });
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const comment = await CommentService.getAllComment();
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }
}


export default new CommentController();