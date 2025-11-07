-- ============================================
-- SEED SQL - Datos iniciales
-- Base de datos: prueba_global_mf
-- ============================================

-- ============================================
-- INSERTAR ADMINISTRADORES
-- ============================================
-- Contraseña hasheada para: admin123
-- Hash generado con bcrypt (10 rounds)
-- Nota: Deberás generar este hash en el backend la primera vez

-- Para generar el hash en Node.js:
-- const bcrypt = require('bcrypt');
-- bcrypt.hash('admin123', 10).then(hash => console.log(hash));

-- Por ahora usamos un placeholder, lo generaremos programáticamente
-- Usuario: admin@test.com
-- Contraseña: admin123

INSERT INTO admins (email, password, full_name) VALUES
('admin@test.com', '$2b$10$XKwOqUdLNLQz8zRvZn8zJO8QJDxJqTqZ0YlZvZvZvZvZvZvZvZvZu', 'Administrador Principal'),
('teacher@test.com', '$2b$10$XKwOqUdLNLQz8zRvZn8zJO8QJDxJqTqZ0YlZvZvZvZvZvZvZvZvZu', 'Profesor de Prueba');

-- ============================================
-- INSERTAR PROGRAMAS DE EJEMPLO
-- ============================================
INSERT INTO programs (name, description, start_date, status) VALUES
(
    'Desarrollo Web Full Stack',
    'Curso completo de desarrollo web moderno utilizando React, Node.js, Next.js y NestJS. Aprende a crear aplicaciones web escalables y de alto rendimiento.',
    '2025-01-15',
    'active'
),
(
    'Data Science con Python',
    'Domina el análisis de datos, visualización y machine learning usando Python, Pandas, NumPy y Scikit-learn. Incluye proyectos prácticos con datasets reales.',
    '2025-02-01',
    'active'
),
(
    'DevOps y Cloud Computing',
    'Aprende las mejores prácticas de DevOps, CI/CD, Docker, Kubernetes y servicios en la nube de AWS. Automatiza tus despliegues y mejora la eficiencia.',
    '2025-03-10',
    'inactive'
),
(
    'Diseño UX/UI Profesional',
    'Curso intensivo de diseño de experiencia de usuario e interfaces. Aprende Figma, Design Thinking y crea portfolios profesionales.',
    '2025-01-20',
    'active'
),
(
    'Ciberseguridad y Ethical Hacking',
    'Fundamentos de seguridad informática, pentesting, análisis de vulnerabilidades y defensa contra ataques. Certificación incluida.',
    '2025-04-01',
    'inactive'
);

-- ============================================
-- INSERTAR USUARIOS DE EJEMPLO
-- ============================================
INSERT INTO users (program_id, full_name, email) VALUES
-- Usuarios del programa "Desarrollo Web Full Stack" (id: 1)
(1, 'Juan Pérez García', 'juan.perez@example.com'),
(1, 'María González López', 'maria.gonzalez@example.com'),
(1, 'Carlos Rodríguez Martínez', 'carlos.rodriguez@example.com'),
(1, 'Ana Martínez Sánchez', 'ana.martinez@example.com'),

-- Usuarios del programa "Data Science con Python" (id: 2)
(2, 'Luis Hernández Torres', 'luis.hernandez@example.com'),
(2, 'Carmen Díaz Ruiz', 'carmen.diaz@example.com'),
(2, 'Pedro Morales Castro', 'pedro.morales@example.com'),

-- Usuarios del programa "Diseño UX/UI Profesional" (id: 4)
(4, 'Laura Jiménez Flores', 'laura.jimenez@example.com'),
(4, 'Roberto Vargas Mendoza', 'roberto.vargas@example.com'),
(4, 'Sofía Ramírez Ortiz', 'sofia.ramirez@example.com'),
(4, 'Diego Castro Herrera', 'diego.castro@example.com'),
(4, 'Valentina Rojas Luna', 'valentina.rojas@example.com');

-- ============================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================

-- Ver administradores
SELECT id, email, full_name, created_at FROM admins;

-- Ver programas
SELECT id, name, status, start_date FROM programs ORDER BY start_date;

-- Ver usuarios por programa
SELECT
    u.id,
    u.full_name,
    u.email,
    p.name as program_name
FROM users u
JOIN programs p ON u.program_id = p.id
ORDER BY p.name, u.full_name;

-- Estadísticas
SELECT
    p.name as program,
    p.status,
    COUNT(u.id) as total_users
FROM programs p
LEFT JOIN users u ON p.id = u.program_id
GROUP BY p.id, p.name, p.status
ORDER BY total_users DESC;
