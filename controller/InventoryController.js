import InventoryService from '../service/InventoryService.js';

class InventoryController {
    async addAnime(req, res, next) {
        try {
            const { _id, animeId, typeItem } = req.body;
            const userData = await InventoryService.addAnime(_id, animeId, typeItem);
            return res.json({ message: 'success add' });
        } catch (e) {
            next(e);
        }
    }
    async deleteAnime(req, res, next) {
        try {
            const animeId = req.params.id;
            const userData = await InventoryService.deleteAnime(animeId);
            return res.json({ message: 'success delete' });
        } catch (e) {
            next(e);
        }
    }

    async updateAnime(req, res, next) {
        try {
            const { typeItem } = req.body;
            const animeId = req.params.id;
            const userData = await InventoryService.updateAnime(animeId, typeItem);
            return res.json({ message: 'success update', });
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const comment = await InventoryService.getAllAnime();
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }
}


export default new InventoryController();