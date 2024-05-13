import mongoose from 'mongoose';

const Inventory = new mongoose.Schema({
    animeId: { type: String, require: true },
    idUser: { type: String, require: true },
    typeItem: { type: String, require: true },
});

export default mongoose.model('Inventory', Inventory);