import PostService from './PostService.js';


class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files.picture);
            res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async getAll(req, res) {
        try {
            const post = await PostService.getAll();
            return res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async getOne(req, res) {
        try {
            const postFind = await PostService.getOne(req.params.id);
            return res.json(postFind);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async update(req, res) {
        try {
            const updatePost = await PostService.update(req.body);
            return res.json(updatePost);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        const deletePost = await PostService.delete(req.params.id);
        return res.json(deletePost);
    }
}

export default new PostController();