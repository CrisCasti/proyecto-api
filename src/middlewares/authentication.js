import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

// Middleware que valida el Bearer Token antes de permitir el acceso a rutas protegidas
export const authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Extrae el token del formato "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verifica la firma y vigencia del token; si es válido, continúa hacia el controlador
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.user = decoded;
    next();
  });
};