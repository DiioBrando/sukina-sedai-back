class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(post) {
        if (!this.model) {
            throw new Error('Model is not defined');
        }
        const createdPost = await this.model.create(post);
        return createdPost;
    }
    async getAll() {
        const post = await this.model.find();
        return post;
    }
    async getOne(id) {
        if(!id) {
            throw new Error('No identifier was found or specified')
        }
        const postFind = await this.model.findById(id);
        return postFind;
    }
    async update(post) {
        if(!post._id) {
            throw new Error('No identifier was found or specified')
        }
        const updatePost = await this.model.findByIdAndUpdate(post._id, post, { new: true });
        return updatePost;
    }

    async delete(id) {
        if(!id) {
            throw new Error('No identifier was found or specified')
        }
        const deletePost = await this.model.findByIdAndDelete(id);
        return deletePost;
    }
}

export default BaseService;