import BaseController from "../../BaseController.js";
import PostService from "../service/PostService.js";

class PostController extends BaseController {
    constructor() {
        super(PostService);
    }
}

export default new PostController();