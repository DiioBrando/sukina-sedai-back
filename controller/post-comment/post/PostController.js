import PostService from "../service/PostService.js";

class PostController {
    async create(post) {
        const createdPost = await PostService.create(post);
        return createdPost;
    }

    async getAll() {
        const posts = await PostService.getAll();
        return posts;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await PostService.getOne(id);
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await PostService.update(post._id, post, { new: true })
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await PostService.delete(id);
        return post;
    }
}

export default new PostController();