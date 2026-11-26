import 'dotenv/config';// Carga las variables de entorno desde .env
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Configuración de acceso al proyecto de Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "proyecto-api-bd333",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "715465628725",
  appId: process.env.FIREBASE_APP_ID
};

// Inicializa la app de Firebase y obtiene la instancia de Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };