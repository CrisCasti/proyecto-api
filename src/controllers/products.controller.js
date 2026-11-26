import * as productsService from '../services/products.service.js';

// Obtiene todos los productos y responde con estado 200 o 500 ante error
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Busca un producto por ID: devuelve 200 si existe o 404 si no se encuentra
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crea un nuevo producto a partir del body y devuelve estado 201
export const createProduct = async (req, res) => {
  try {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Elimina un producto por ID y confirma con estado 200
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};