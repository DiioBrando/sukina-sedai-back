import ApiError from "../exceptions/ApiError.js";
import User from "../model/users-model/User.js";
import UserDTO from "../dtos/UserDTO.js";
import Comment from "../model/comment-model/Comment.js";

class CommentService {
    async commentAdd(comment, _id, animeId) {
        if(comment.length === 0) {
            throw ApiError.BadRequest();
        }
        const user = await User.findOne({ _id: _id });
        if(!user) {
            throw ApiError.BadRequest();
        }
        const userDto = new UserDTO(user);
        const commentCreate = await Comment.create({ comment: comment, idUser: userDto.id, login: userDto.login, animeId: animeId });
        return commentCreate;
    }
    async updateComment(comment, _id) {
        const userComment = await Comment.findOne({ _id });

        if(!userComment) {
            throw ApiError.BadRequest();
        }

        const updateComment = await Comment.findOneAndUpdate({ _id }, { comment: comment, timestamp: String(Date.now()), changed: true }, { new: true });
        return updateComment;
    }

    async deleteComment(_id) {
        const userComment = await Comment.findOne({ _id });
        if(!userComment) {
            throw ApiError.BadRequest();
        }
        const deleteComment = await Comment.findOneAndDelete({ _id });
        return deleteComment;
    }

    async getAllComment() {
        const commentData = await Comment.find();
        return commentData;
    }
}


export default new CommentService();