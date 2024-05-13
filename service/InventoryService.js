import Inventory from '../model/inventory-model/Inventory.js';
import ApiError from '../exceptions/ApiError.js';
import User from '../model/users-model/User.js';
import UserDTO from '../dtos/UserDTO.js';

class InventoryService {

    async addAnime(_id, animeId, typeItem){


        const user = await User.findOne({ _id: _id });
        if(!user) {
            throw ApiError.BadRequest();
        }
        const userDto = new UserDTO(user);
        const create = await Inventory.create({ animeId: animeId, idUser: userDto.id, typeItem: typeItem });
        return create;
    }

    async deleteAnime(animeId){
        const userAnime = await Inventory.findOne({ animeId });
        if(!userAnime) {
            throw ApiError.BadRequest('not found anime in inventory');
        }
        const deleteAnime = await Inventory.findOneAndDelete({ animeId });
        return deleteAnime;
    }

    async updateAnime(animeId, typeItem){
        const animeInventory = await Inventory.findOne({ animeId });
        if(!animeInventory) {
            throw ApiError.BadRequest('not found anime in inventory');
        }
        const updateAnime = await Inventory.findOneAndUpdate({ animeId }, { animeId: animeId, typeItem: typeItem }, { new: true });
        return updateAnime;
    }

    async getAllAnime(){
        const userData = await Inventory.find();
        return userData;
    }
}


export default new InventoryService();