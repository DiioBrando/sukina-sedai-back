import ApiError from "../exceptions/ApiError.js";
import User from "../model/users-model/User.js";
import UserDTO from "../dtos/UserDTO.js";
import Comment from "../model/comment-model/Comment.js";
import Dislike from "../model/comment-model/Dislike.js";
import Like from "../model/comment-model/Like.js";

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

    async likeAdd(currentIdUser, idComment) {
        const findLike = await Like.findOne({ idUser: currentIdUser });

        if(findLike) {
            throw ApiError.BadRequest('already add like');
        }

        const comment = await Comment.findById({ _id: idComment });
        if(!comment) {
            throw ApiError.BadRequest();
        }
        const user = await User.findOne({ _id: currentIdUser });
        if(!user) {
            throw ApiError.BadRequest();
        }



        const userDto = new UserDTO(user);
        const like = await Like.create({ login: userDto.login, idUser: userDto.id });
        comment.like.push(like)
        await comment.save();
        return like;
    }

    async dislikeAdd(currentIdUser, idComment) {
        const findDislike = await Dislike.findOne({ idUser: currentIdUser });
        if(findDislike) {
            throw ApiError.BadRequest('already add dislike');
        }


        const comment = await Comment.findById({ _id: idComment });
        if(!comment) {
            throw ApiError.BadRequest();
        }
        const user = await User.findOne({ _id: currentIdUser });
        if(!user) {
            throw ApiError.BadRequest();
        }

        const userDto = new UserDTO(user);
        const dislike = await Dislike.create({ login: userDto.login, idUser: userDto.id });

        comment.dislike.push(dislike)
        await comment.save();
        return dislike;
    }

    async deleteDislike(currentIdUser, idComment) {
        const findDislike = await Dislike.findOne({ idUser: currentIdUser });

        if(!findDislike) {
            throw ApiError.BadRequest('dislike not found');
        }

        const comment = await Comment.findOne({ _id: idComment });
        if(!comment) {
            throw ApiError.BadRequest();
        }

        const user = await User.findOne({ _id: currentIdUser });
        if(!user) {
            throw ApiError.BadRequest();
        }

        const deleteDislike = await Dislike.findOneAndDelete({ idUser: currentIdUser });
        comment.dislike.pull(findDislike);
        await comment.save();

        return deleteDislike;
    }

    async deleteLike(currentIdUser, idComment) {
        const findLike = await Like.findOne({ idUser: currentIdUser });

        if(!findLike) {
            throw ApiError.BadRequest('like not found');
        }

        const comment = await Comment.findOne({ _id: idComment });
        if(!comment) {
            throw ApiError.BadRequest();
        }

        const user = await User.findOne({ _id: currentIdUser });
        if(!user) {
            throw ApiError.BadRequest();
        }

        const deleteLike = await Like.findOneAndDelete({ idUser: currentIdUser });
        comment.like.pull(findLike);
        await comment.save();

        return deleteLike;
    }

}


export default new CommentService();