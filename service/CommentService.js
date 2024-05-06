import ApiError from "../exceptions/ApiError.js";
import User from "../model/users-model/User.js";
import UserDTO from "../dtos/UserDTO.js";
import Comment from "../model/Comment.js";

class CommentService {
    async commentAdd(comment, login) {
        if(comment.length === null) {
            throw ApiError.BadRequest();
        }
        const user = await User.findOne({ login: login });
        if(!user) {
            throw ApiError.BadRequest();
        }
        const userDto = new UserDTO(user);
        const comm = await Comment.create({ comment: comment, idUser: userDto.id, login: userDto.login });
        return comm
    }
    async updateComment(comment, login) {
        const user = await Comment.findOne({ login: login });
        if(!user) {
            throw ApiError.BadRequest();
        }
        const userDto = new UserDTO(user);
        const updateComment = await Comment.findOneAndUpdate({ login: userDto.login }, { comment: comment }, { new: true });
        return updateComment;
    }

}


export default new CommentService();