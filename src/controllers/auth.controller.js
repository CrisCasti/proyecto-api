import { generateToken } from '../utils/token-generator.js';

// Credenciales de ejemplo para validar el acceso
const default_user = {
  id: 1,
  email: 'user@email.com',
  password: 'strongPass123'
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