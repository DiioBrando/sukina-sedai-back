import Comment from '../../../model/Comment.js';
import BaseService from '../../BaseService.js';

class PostService extends BaseService {
    constructor() {
        super(Comment);
    }
}

export default new PostService();