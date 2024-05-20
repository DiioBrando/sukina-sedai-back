import Router from 'express';
import { authMiddleware } from '../middlewaree/authMiddlewaree.js';
import InventoryController from '../controller/InventoryController.js';


const routerInventory = new Router();

routerInventory.post('/add-anime-inventory', authMiddleware, InventoryController.addAnime);
routerInventory.delete('/delete-anime-inventory/:id', authMiddleware, InventoryController.deleteAnime);
routerInventory.delete('/delete-anime-inventory-array', authMiddleware, InventoryController.deleteManyAnime)
routerInventory.patch('/update-anime-inventory/:id', authMiddleware, InventoryController.updateAnime);
routerInventory.get('/getAll-items-inventory', authMiddleware, InventoryController.getAll);
export default routerInventory;
