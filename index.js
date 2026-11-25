import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './src/routes/auth.routes.js';
import productsRouter from './src/routes/products.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/api', productsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: '404 - Recurso no encontrado',
    mensaje: 'La ruta que intentas consultar no está definida en la aplicación.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});