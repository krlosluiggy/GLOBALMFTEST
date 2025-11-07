# Sistema de Gestión de Cursos - Global MF Foundation

Sistema completo de gestión de cursos con panel de administración y registro público de usuarios.


### Base de Datos
- **PostgreSQL 14+**
- Tablas: `admins`, `programs`, `users`
- Relaciones con foreign keys
- Índices para optimización

---

## Características Principales

### Para Usuarios Públicos
- ✅ Registro a cursos sin necesidad de cuenta
- ✅ Visualización de cursos disponibles
- ✅ Confirmación inmediata de registro
- ✅ Interfaz intuitiva y responsive

### Para Administradores
- ✅ Login seguro con JWT
- ✅ CRUD completo de programas/cursos
- ✅ CRUD completo de usuarios
- ✅ Vista de usuarios por programa
- ✅ Filtros y paginación
- ✅ Dashboard completo

### API
- ✅ REST API con validaciones
- ✅ GraphQL para consultas avanzadas
- ✅ Autenticación JWT
- ✅ Protección de rutas sensibles
- ✅ Manejo de errores robusto

---


## Instalación Local

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/globalmf_test.git
cd globalmf_test
```

### 2. Configurar Base de Datos

```bash
# Crear base de datos
createdb prueba_global_mf

# Ejecutar schema
psql -d prueba_global_mf -f database/schema.sql

# Ejecutar seeds (datos de prueba)
psql -d prueba_global_mf -f database/seed.sql
```

### 3. Configurar Backend

```bash
cd backend
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus credenciales de PostgreSQL
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=tu_password
# DB_NAME=prueba_global_mf
# JWT_SECRET=tu_clave_secreta
```

```bash
# Iniciar backend en modo desarrollo
npm run start:dev

# El backend estará disponible en http://localhost:3001
```

### 4. Configurar Frontend

```bash
cd frontend
npm install

# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local

# Iniciar frontend
npm run dev

# El frontend estará disponible en http://localhost:3000
```

---

## Usuarios de Prueba

### Administrador
- **Email**: `admin@test.com`
- **Password**: `admin123`

### Otro Administrador
- **Email**: `teacher@test.com`
- **Password**: `admin123`

## Variables de Entorno

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=prueba_global_mf
JWT_SECRET=super-secret-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=3001
NODE_ENV=development
```




