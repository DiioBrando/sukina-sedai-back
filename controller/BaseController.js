class BaseController {
    constructor(model) {
        this.model = model;
    }

    async create(req, res) {
        try {
            const post = await this.model.create(req.body);
            res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async getAll(req, res) {
        try {
            const post = await this.model.getAll();
            return res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async getOne(req, res) {
        try {
            const postFind = await this.model.getOne(req.params.id);
            return res.json(postFind);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    async update(req, res) {
        try {
            const updatePost = await this.model.update(req.body);
            return res.json(updatePost);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        const deletePost = await this.model.delete(req.params.id);
        return res.json(deletePost);
    }
}

export default BaseController;