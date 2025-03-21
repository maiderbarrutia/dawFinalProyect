
SELECT * FROM inscripcion;
SELECT * FROM actividad;
SELECT * FROM empresa;
SELECT * FROM categoria;
SELECT * FROM usuario;

SHOW CREATE TABLE empresa;

DESCRIBE inscripcion;
DESCRIBE actividad;
DESCRIBE empresa;
DESCRIBE categoria;
DESCRIBE usuario;

DELETE FROM inscripcion;
DELETE FROM actividad;
DELETE FROM empresa;
DELETE FROM categoria;
DELETE FROM usuario;

ALTER TABLE inscripcion AUTO_INCREMENT = 1; 
ALTER TABLE actividad AUTO_INCREMENT = 1; 
ALTER TABLE empresa AUTO_INCREMENT = 1; 
ALTER TABLE categoria AUTO_INCREMENT = 1;
ALTER TABLE usuario AUTO_INCREMENT = 1; 

DROP TABLE inscripcion;
DROP TABLE actividad;
DROP TABLE empresa;
DROP TABLE categoria;
DROP TABLE usuario;

SELECT * FROM actividad WHERE id_actividad = 2;
SELECT * FROM categoria WHERE id_categoria = 2;

DROP TABLE IF EXISTS Actividad;

SHOW CREATE TABLE inscripcion;
SHOW TABLES;
SHOW CREATE TABLE inscripcion;


SELECT *
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'aisiplan';


SHOW CREATE TABLE Actividad;

-- Consulta para probar todas las relaciones en la base de datos
SELECT
    e.id_empresa,
    e.nombre_empresa,
    e.tipo_empresa,
    c.id_categoria,
    c.nombre_categoria,
    a.id_actividad,
    a.titulo_actividad,
    a.descripcion_actividad,
    a.fecha_actividad,
    a.hora_actividad,
    a.precio_actividad,
    u.id_usuario,
    u.nombre_usuario,
    u.email_usuario,
    i.id_inscripcion,
    i.fecha_inscripcion
FROM Empresa e
LEFT JOIN Actividad a ON e.id_empresa = a.empresa_id
LEFT JOIN Categoria c ON a.categoria_id = c.id_categoria
LEFT JOIN Inscripcion i ON a.id_actividad = i.actividad_id
LEFT JOIN Usuario u ON i.usuario_id = u.id_usuario;

-- Confirmar las empresas con actividades:
SELECT e.nombre_empresa, a.titulo_actividad
FROM Empresa e
JOIN Actividad a ON e.id_empresa = a.empresa_id;

-- Verificar actividades y categorías:
SELECT a.titulo_actividad, c.nombre_categoria
FROM Actividad a
JOIN Categoria c ON a.categoria_id = c.id_categoria;

-- Comprobar inscripciones por usuarios:
SELECT u.nombre_usuario, a.titulo_actividad
FROM Usuario u
JOIN Inscripcion i ON u.id_usuario = i.usuario_id
JOIN Actividad a ON i.actividad_id = a.id_actividad;


-- COMPROBACIONES

-- INSERTAR UNA ACTIVIDAD CON UNA EMPRESA_ID QUE NO EXISTE
-- Crear una actividad con una empresa que no existe
INSERT INTO Actividad (
    titulo_actividad,
    descripcion_actividad,
    empresa_id,
    fecha_actividad,
    hora_actividad,
    precio_actividad,
    numero_plazas,
    duracion_actividad,
    nivel_dificultad,
    tipo_actividad,
    categoria_id,
    ubicacion_actividad
)
VALUES (
    'Actividad Inexistente', 
    'Descripción de prueba', 
    999, -- Este ID no existe en la tabla Empresa
    '2025-04-01', 
    '10:00:00', 
    20.00, 
    30, 
    60, 
    'medio', 
    'Deporte', 
    1, -- Asumiendo que este ID de categoría existe
    'Madrid'
);

-- ELIMINAR EMPRESA PARA COMPROBAR ON DELETE CASCADE
-- verificar las actividades de la empresa antes de eliminarla
SELECT * 
FROM Actividad
WHERE empresa_id = 1; -- Reemplaza "1" con el ID de la empresa que quieres eliminar

-- Eliminar una empresa para comprobar On delete cascade
DELETE FROM Empresa
WHERE id_empresa = 1; -- Reemplaza "1" con el ID de la empresa que vas a eliminar

-- Verificar si las actividades relacionadas han sido eliminadas
SELECT * 
FROM Actividad
WHERE empresa_id = 1;

-- PRUEBAS DE ACTUALIZACIÓN
UPDATE Inscripcion
SET usuario_id = 40 -- Un ID inexistente
WHERE id_inscripcion = 1;

UPDATE Actividad
SET empresa_id = 5 -- Un ID inexistente
WHERE id_actividad = 2;

SHOW CREATE TABLE Inscripcion;
SHOW CREATE TABLE Actividad;

SELECT @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 1;

SHOW INDEX FROM Inscripcion;

SELECT usuario_id
FROM Inscripcion
WHERE usuario_id NOT IN (SELECT id_usuario FROM Usuario);

-- Consulta para encontrar registros con valores duplicados o vacios
SELECT cif_empresa, COUNT(*) AS cuenta
FROM empresa
GROUP BY cif_empresa
HAVING cuenta > 1 OR cif_empresa = '';


SELECT nombre_categoria, COUNT(*) AS cuenta
FROM categoria
GROUP BY nombre_categoria
HAVING cuenta > 1 OR nombre_categoria = '';

