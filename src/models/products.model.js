import { db } from '../data/data.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

// Referencia a la colección "products" en Firestore
const productsCollection = collection(db, 'products');

// Busca un producto puntual por su ID (devuelve null si no existe)
export async function getProductById(id) {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) {
    return { id: productDoc.id, ...productDoc.data() };
  } else {
    return null;
  }
}

// Obtiene todos los documentos de la colección products
export async function getAllProducts() {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

// Guarda un nuevo producto en Firestore y devuelve el objeto con su ID generado
export async function saveProduct(product) {
  const docRef = await addDoc(productsCollection, product);
  return { id: docRef.id, ...product };
}

// Elimina un producto por su ID
export async function deleteProduct(id) {
  await deleteDoc(doc(productsCollection, id));
}