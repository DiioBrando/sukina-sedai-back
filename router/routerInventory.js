import Router from 'express';
import { authMiddleware } from '../middlewaree/authMiddlewaree.js';
import InventoryController from '../controller/InventoryController.js';


const routerComment = new Router();

routerComment.post('/add-anime-inventory', authMiddleware, InventoryController.addAnime);
routerComment.delete('/delete-anime-inventory/:id', authMiddleware, InventoryController.deleteAnime);
routerComment.patch('/update-anime-inventory/:id', authMiddleware, InventoryController.updateAnime);
routerComment.get('/getAll-items-inventory', authMiddleware, InventoryController.getAll);
export default routerComment;
