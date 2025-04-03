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

        const findAnimeInInventory = await Inventory.findOne({ idUser: userDto.id, animeId: animeId, typeItem: typeItem });
        if (findAnimeInInventory) {
            throw ApiError.BadRequest('already add');
        }


        const create = await Inventory.create({ animeId: animeId, idUser: userDto.id, typeItem: typeItem });
        return create;
    }

    async deleteAnime(animeId, userId){
        const userAnime = await Inventory.findOne({ animeId: animeId, idUser: userId });
        if(!userAnime) {
            throw ApiError.BadRequest('not found anime in inventory');
        }

        const deleteAnime = await Inventory.findOneAndDelete({ animeId: animeId, idUser: userId });
        return deleteAnime;
    }
    async deleteManyAnime(animeId, userId){
        const deleteAnime = await Inventory.deleteMany({ idUser: userId, animeId: { $in: animeId } });
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

    async getAllInventory(){
        const userData = await Inventory.find();
        return userData;
    }

    async filterInventoryAnime(arr, idUser, categoryAnime) {
        const currentUserAnime = arr.filter(item => item.idUser === idUser && item.typeItem === categoryAnime).map(item => item.animeId).reduce((acc, cur) => acc + cur + ' ', '').trim().split(' ').join(',');

        console.log(arr.filter(item => item.typeItem === categoryAnime))
        return currentUserAnime;
    }
}


export default new InventoryService();

