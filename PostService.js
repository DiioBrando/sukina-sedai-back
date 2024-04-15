import Post from "./Post.js";
import FileService from './FileService.js';
class PostService {
    async create(post, picture) {
        const fileName = FileService.saveFile(picture);
        const createdPost = await Post.create({...post, picture: fileName});
        return createdPost;
    }
    async getAll() {
            const post = await Post.find();
            return post;
    }
    async getOne(id) {
        if(!id) {
            throw new Error('No identifier was found or specified')
        }

        const postFind = await Post.findById(id);

        return postFind;
    }
    async update(post) {
        if(!post._id) {
            throw new Error('No identifier was found or specified')
        }

        const updatePost = await Post.findByIdAndUpdate(post._id, post, { new: true });
        return updatePost;
    }

    async delete(id) {
        if(!id) {
            throw new Error('No identifier was found or specified')
        }

        const deletePost = await Post.findByIdAndDelete(id);
        return deletePost;
    }
}

export default new PostService();