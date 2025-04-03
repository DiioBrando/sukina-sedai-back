import InventoryService from '../service/InventoryService.js';

class InventoryController {
    async addAnime(req, res, next) {
        try {
            const { animeId, typeItem } = req.body;
            const user = req.user;
            const userData = await InventoryService.addAnime(user.id, animeId, typeItem);
            return res.json({ message: 'success add' });
        } catch (e) {
            next(e);
        }
    }
    async deleteAnime(req, res, next) {
        try {
            const animeId = req.params.id;
            const userId = req.user;
            const userData = await InventoryService.deleteAnime(animeId, userId.id);
            return res.json({ message: 'success delete' });
        } catch (e) {
            next(e);
        }
    }

    async deleteManyAnime(req, res, next) {
        try {
            const { animeId } = req.body;
            const userId = req.user;
            const userData = await InventoryService.deleteManyAnime(animeId, userId);
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

    async getAllInventory(req, res, next) {
        try {
            const userId = req.params.id;
            const categoryAnime = req.params.type;
            const inventory = await InventoryService.getAllInventory();
            const sortInventory = await InventoryService.filterInventoryAnime(inventory, userId, categoryAnime);
            return res.json(sortInventory);
        } catch (e) {
            next(e);
        }
    }
}


export default new InventoryController();