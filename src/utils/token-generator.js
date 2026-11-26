import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Clave secreta para firmar los tokens, cargada desde las variables de entorno
const secret_key = process.env.JWT_SECRET_KEY;

// Genera un token JWT con los datos básicos del usuario y 1 hora de vigencia
export const generateToken = (userData) => {
  const user = { id: userData.id, email: userData.email };
  const expiration = { expiresIn: '1h' };
  return jwt.sign(user, secret_key, expiration);
};