import User from '../../../model/User.js';
import FileService from '../../FileService.js';
import BaseService from "../../BaseService.js";
class PostService extends BaseService {
    constructor() {
        super(User);
    }

    async create(post, picture) {
        const fileName = FileService.saveFile(picture);

        const createdPost = await User.create({...post, picture: fileName});
        return createdPost;
    }
}

export default new PostService();