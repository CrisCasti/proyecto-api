import 'dotenv/config';
import { generateToken } from '../utils/token-generator.js';

// Credenciales cargadas desde variables de entorno
const default_user = {
  id: 1,
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD
};

// Valida credenciales y devuelve el token JWT (200) o error de autenticación (401)
export async function login(req, res) {
  const { email, password } = req.body;

  if (email === default_user.email && password === default_user.password) {
    const user = { id: default_user.id, email };
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
}