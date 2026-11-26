import * as productsModel from '../models/products.model.js';

// Intermediario entre el controlador y el modelo para listar todos los productos
export const getAllProducts = async () => {
  return await productsModel.getAllProducts();
};

// Solicita al modelo un producto puntual por su ID
export const getProductById = async (id) => {
  return await productsModel.getProductById(id);
};

// Envía los datos del nuevo producto al modelo para guardarlo en Firestore
export const createProduct = async (productData) => {
  return await productsModel.saveProduct(productData);
};

// Indica al modelo que elimine el producto correspondiente al ID recibido
export const deleteProduct = async (id) => {
  return await productsModel.deleteProduct(id);
};