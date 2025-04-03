import CommentService from "../service/CommentService.js";

class CommentController {

    async commentAdd(req, res, next) {
        try {
            const { animeId, comment } = req.body;
            const user = req.user;
            const userData = await CommentService.commentAdd(comment, user.id, animeId);
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

    async likeAdd(req, res, next) {
        try {
            const { idComment } = req.body;
            const currentUserIdAddingLike = req.user;
            const like = await CommentService.likeAdd(currentUserIdAddingLike.id, idComment);
            return res.json({ message: 'success add' });
        } catch (e) {
            next(e);
        }
    }

    async dislikeAdd(req, res, next) {
        try {
            const { idComment } = req.body;
            const currentUserIdAddingLike = req.user;
            const dislike = await CommentService.dislikeAdd(currentUserIdAddingLike.id, idComment);
            return res.json({ message: 'success add' });
        } catch (e) {
            next(e);
        }
    }

    async deleteDislike(req, res, next) {
        try {
            const { idComment } = req.body;
            const currentUserIdAddingLike = req.user;
            const dislike = await CommentService.deleteDislike(currentUserIdAddingLike.id, idComment);
            return res.json({ message: 'success delete dislike' });
        } catch (e) {
            next(e);
        }
    }

    async deleteLike(req, res, next) {
        try {
            const { idComment } = req.body;
            const currentUserIdAddingLike = req.user;
            const dislike = await CommentService.deleteLike(currentUserIdAddingLike.id, idComment);
            return res.json({ message: 'success delete like' });
        } catch (e) {
            next(e);
        }
    }

}


export default new CommentController();