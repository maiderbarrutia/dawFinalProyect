
SELECT * FROM Registration;
SELECT * FROM Activity;
SELECT * FROM Company;
SELECT * FROM Category;
SELECT * FROM UserData;

SHOW CREATE TABLE Company;

SELECT company_email, company_password FROM company WHERE company_email = 'contacto2@greentech.com';

UPDATE activity
SET activity_images = '["image1.jpg", "aventura.jpg", "deportes.jpg"]'
WHERE activity_id=1;

UPDATE activity
SET activity_description = "Escapada al parque regional de Gredos: una de las  sierras mas extensas del sistema central, característica por sus moles  graníticas. Un paraje que constituye hoy en día uno de los conjuntos  glaciares mejor conservados del sur de Europa, pudiendo observar  lagunas, glaciares, circos, gargantas, etc. Visitaremos caminando la Laguna Grande y el Circo de Gredos hasta llegar el refugio Elola. También visitaremos las Cuevas del Águila: variedad de colores y texturas realmente inusuales en otras cuevas de  la Península Ibérica debido a la compleja evolución, resultado de  reiteradas fases de creación y destrucción de las formaciones."
WHERE activity_id=1;

DESCRIBE Registration;
DESCRIBE Activity;
DESCRIBE Company;
DESCRIBE Category;
DESCRIBE UserData;

DELETE FROM Registration;
DELETE FROM Activity;
DELETE FROM Company;
DELETE FROM Category;
DELETE FROM UserData;

DELETE FROM activity WHERE activity_id=20;

ALTER TABLE Registration AUTO_INCREMENT = 1; 
ALTER TABLE Activity AUTO_INCREMENT = 1; 
ALTER TABLE Company AUTO_INCREMENT = 1; 
ALTER TABLE Category AUTO_INCREMENT = 1;
ALTER TABLE UserData AUTO_INCREMENT = 1; 

DROP TABLE Registration;
DROP TABLE Activity;
DROP TABLE Company;
DROP TABLE Category;
DROP TABLE UserData;

SELECT * FROM Activity WHERE id_Activity = 2;
SELECT * FROM Category WHERE id_Category = 2;

DROP TABLE IF EXISTS Activity;

SHOW CREATE TABLE Registration;
SHOW TABLES;
SHOW CREATE TABLE Registration;


SELECT *
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'aisiplan';


SHOW CREATE TABLE Activity;

-- Consulta para probar todas las relaciones en la base de datos
SELECT
    e.id_Company,
    e.nombre_Company,
    e.tipo_Company,
    c.id_Category,
    c.nombre_Category,
    a.id_Activity,
    a.titulo_Activity,
    a.descripcion_Activity,
    a.fecha_Activity,
    a.hora_Activity,
    a.precio_Activity,
    u.id_UserData,
    u.nombre_UserData,
    u.email_UserData,
    i.id_Registration,
    i.fecha_Registration
FROM Company e
LEFT JOIN Activity a ON e.id_Company = a.Company_id
LEFT JOIN Category c ON a.Category_id = c.id_Category
LEFT JOIN Registration i ON a.id_Activity = i.Activity_id
LEFT JOIN UserData u ON i.UserData_id = u.id_UserData;

-- Confirmar las Companys con Activityes:
SELECT e.nombre_Company, a.titulo_Activity
FROM Company e
JOIN Activity a ON e.id_Company = a.Company_id;

-- Verificar Activityes y categorías:
SELECT a.titulo_Activity, c.nombre_Category
FROM Activity a
JOIN Category c ON a.Category_id = c.id_Category;

-- Comprobar Registrationes por UserDatas:
SELECT u.nombre_UserData, a.titulo_Activity
FROM UserData u
JOIN Registration i ON u.id_UserData = i.UserData_id
JOIN Activity a ON i.Activity_id = a.id_Activity;


-- COMPROBACIONES

-- INSERTAR UNA Activity CON UNA Company_ID QUE NO EXISTE
-- Crear una Activity con una Company que no existe
INSERT INTO Activity (
    titulo_Activity,
    descripcion_Activity,
    Company_id,
    fecha_Activity,
    hora_Activity,
    precio_Activity,
    numero_plazas,
    duracion_Activity,
    nivel_dificultad,
    tipo_Activity,
    Category_id,
    ubicacion_Activity
)
VALUES (
    'Activity Inexistente', 
    'Descripción de prueba', 
    999, -- Este ID no existe en la tabla Company
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

-- ELIMINAR Company PARA COMPROBAR ON DELETE CASCADE
-- verificar las Activityes de la Company antes de eliminarla
SELECT * 
FROM Activity
WHERE Company_id = 1; -- Reemplaza "1" con el ID de la Company que quieres eliminar

-- Eliminar una Company para comprobar On delete cascade
DELETE FROM Company
WHERE id_Company = 1; -- Reemplaza "1" con el ID de la Company que vas a eliminar

-- Verificar si las Activityes relacionadas han sido eliminadas
SELECT * 
FROM Activity
WHERE Company_id = 1;

-- PRUEBAS DE ACTUALIZACIÓN
UPDATE Registration
SET UserData_id = 40 -- Un ID inexistente
WHERE id_Registration = 1;

UPDATE Activity
SET Company_id = 5 -- Un ID inexistente
WHERE id_Activity = 2;

SHOW CREATE TABLE Registration;
SHOW CREATE TABLE Activity;

SELECT @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 1;

SHOW INDEX FROM Registration;

SELECT UserData_id
FROM Registration
WHERE UserData_id NOT IN (SELECT id_UserData FROM UserData);

-- Consulta para encontrar registros con valores duplicados o vacios
SELECT cif_Company, COUNT(*) AS cuenta
FROM Company
GROUP BY cif_Company
HAVING cuenta > 1 OR cif_Company = '';


SELECT nombre_Category, COUNT(*) AS cuenta
FROM Category
GROUP BY nombre_Category
HAVING cuenta > 1 OR nombre_Category = '';

