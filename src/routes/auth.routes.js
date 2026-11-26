import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Ruta pública para autenticar al usuario y emitir el token JWT
router.post('/login', login);

export default router;