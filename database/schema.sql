-- ============================================
-- SCHEMA SQL - Sistema de Gestión de Cursos
-- Base de datos: prueba_global_mf
-- ============================================

-- Eliminar tablas si existen (para recrear)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- ============================================
-- TABLA: admins
-- Descripción: Administradores que pueden hacer login
-- ============================================
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por email
CREATE INDEX idx_admins_email ON admins(email);

-- ============================================
-- TABLA: programs
-- Descripción: Programas/Cursos disponibles
-- ============================================
CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por nombre
CREATE INDEX idx_programs_name ON programs(name);

-- Índice para filtros por status
CREATE INDEX idx_programs_status ON programs(status);

-- ============================================
-- TABLA: users
-- Descripción: Usuarios registrados en cursos
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    program_id INTEGER NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Llave foránea hacia programs
    CONSTRAINT fk_program FOREIGN KEY (program_id)
        REFERENCES programs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Índice para búsquedas por programa
CREATE INDEX idx_users_program_id ON users(program_id);

-- Índice para búsquedas por email
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- FUNCIÓN: Actualizar timestamp automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en programs
CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Listar todas las tablas creadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
