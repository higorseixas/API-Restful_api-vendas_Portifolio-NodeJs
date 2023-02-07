import { Router } from 'express';
import ProductsController from '../controllers/ProductsControllers';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.get('/', productsController.create);
productsRouter.get('/:id', productsController.update);
productsRouter.get('/:id', productsController.delete);

export default productsRouter;
