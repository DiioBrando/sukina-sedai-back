import User from '../../../model/User.js';
import FileService from '../../FileService.js';
class PostService {
    async create(post, picture) {
        const fileName = FileService.saveFile(picture);
        const createdPost = await User.create({...post, picture: fileName});
        return createdPost;
    }

    async getAll() {
        const posts = await User.find();
        return posts;
    }
    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await User.findById(id);
        return post;
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан ID')
        }
        const updatedPost = await User.findByIdAndUpdate(post._id, post, { new: true })
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        const post = await User.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService();