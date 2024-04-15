import PostService from '../service/PostService.js';
import BaseController from "../../BaseController.js";

class PostController extends BaseController {
    constructor() {
        super(PostService);
    }

    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files.picture);
            res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new PostController();