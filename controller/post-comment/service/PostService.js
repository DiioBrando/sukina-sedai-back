import Comment from '../../../model/Comment.js';

class PostService {
    async create(post) {
        const createdPost = await Comment.create(post);
        return createdPost;
    }

    async getAll() {
        const posts = await Comment.find();
        return posts;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Comment.findById(id);
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await Comment.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await Comment.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService();