import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { authentication } from '../middlewares/authentication.js';

const router = Router();

// Exige un Bearer Token válido para todas las rutas de este router
router.use(authentication);

// Endpoints de productos 
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products/create', createProduct);
router.delete('/products/:id', deleteProduct);

export default router;