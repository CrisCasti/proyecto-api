# 📦 API REST de Gestión de Productos — Proyecto Final (Node.js)

API RESTful desarrollada con **Node.js**, **Express** y **Cloud Firestore (Firebase)** para administrar el catálogo de productos de una tienda oficial. Implementa una arquitectura escalable por capas, autenticación mediante **JSON Web Tokens (JWT)** y manejo estandarizado de errores HTTP.

## 🌐 Despliegue en Producción

* **URL Base:** `https://proyecto-api-mauve.vercel.app`
* **Plataforma:** Vercel

---

## 🛠️ Tecnologías Utilizadas

* **Node.js** (ESModules — `"type": "module"`)
* **Express** — Framework para el servidor web, enrutamiento y middlewares
* **CORS** — Habilitación de peticiones de origen cruzado para clientes Frontend
* **body-parser** — Procesamiento de cuerpos de petición en formato JSON
* **dotenv** — Gestión segura de variables de entorno
* **Firebase / Cloud Firestore** — Base de datos NoSQL en la nube
* **jsonwebtoken (JWT)** — Generación y verificación de *Bearer Tokens*

---

## 📁 Arquitectura del Proyecto

El código está organizado por capas para separar responsabilidades y facilitar el mantenimiento:

```text
proyecto_api/
├── src/
│   ├── controllers/      # Gestión de requests/responses HTTP y códigos de estado
│   │   ├── auth.controller.js
│   │   └── products.controller.js
│   ├── data/             # Conexión e inicialización de Firebase / Firestore
│   │   └── data.js
│   ├── middlewares/      # Middleware de verificación JWT
│   │   └── authentication.js
│   ├── models/           # Acceso a datos y operaciones CRUD sobre Firestore
│   │   └── products.model.js
│   ├── routes/           # Definición modular de endpoints con Express Router
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   ├── services/         # Lógica de negocio e intermediación con los modelos
│   │   └── products.service.js
│   └── utils/            # Generador de tokens JWT
│       └── token-generator.js
├── .env                  # Variables de entorno locales (no versionado)
├── .gitignore            # Exclusión de node_modules y archivos sensibles
├── index.js              # Punto de entrada y configuración global del servidor
├── package.json          # Dependencias y scripts del proyecto
└── vercel.json           # Configuración de despliegue en Vercel
```

---

## ⚙️ Instalación y Ejecución Local

1. **Clonar el repositorio e instalar dependencias:**

   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd proyecto_api
   npm install
   ```

2. **Configurar las variables de entorno:**

   Creá un archivo `.env` en la raíz del proyecto con las siguientes claves:

   ```env
   PORT=3000
   JWT_SECRET_KEY=tu_clave_secreta_jwt
   FIREBASE_API_KEY=tu_api_key
   FIREBASE_AUTH_DOMAIN=tu_auth_domain
   FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   FIREBASE_APP_ID=tu_app_id
   ```

3. **Iniciar el servidor:**

   ```bash
   npm run start
   ```

   La API quedará disponible en `http://localhost:3000`.

---

## 🔐 Autenticación y Endpoints

### 1. Autenticación (Pública)

#### `POST /auth/login`
Valida las credenciales del usuario y devuelve un **JWT** con 1 hora de vigencia para utilizar como *Bearer Token*.

**Body (`application/json`):**
```json
{
  "email": "user@email.com",
  "password": "strongPass123"
}
```

**Respuesta (`200 OK`):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Productos (Rutas Protegidas)

Todas las rutas de `/api/products` requieren enviar el token en el header:
`Authorization: Bearer <tu_token>`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Devuelve el listado completo de productos desde Firestore |
| `GET` | `/api/products/:id` | Devuelve el producto correspondiente al `id` indicado |
| `POST` | `/api/products/create` | Crea un nuevo producto en Firestore a partir del body JSON |
| `DELETE` | `/api/products/:id` | Elimina el producto correspondiente al `id` indicado |

**Ejemplo de body para `POST /api/products/create`:**
```json
{
  "name": "Teclado Mecánico",
  "price": 45000,
  "stock": 10,
  "category": "perifericos"
}
```

---

## 🚨 Manejo de Errores

La API contempla respuestas claras ante distintos escenarios:

* **`400 Bad Request`:** Peticiones con datos inválidos o mal formados.
* **`401 Unauthorized`:** Credenciales inválidas o falta de token en rutas protegidas.
* **`403 Forbidden`:** Token inválido o expirado.
* **`404 Not Found`:** Ruta no definida o producto inexistente.
* **`500 Internal Server Error`:** Errores internos del servidor o fallos al comunicarse con Firestore.