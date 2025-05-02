CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    category_image VARCHAR(255),
    
    INDEX idx_category_name (category_name)
);

INSERT INTO Category (category_name, category_description, category_image)
VALUES
('Aventura', 'Disfruta de emocionantes actividades llenas de adrenalina y desafíos al aire libre.', 'aventura.jpg'),
('Gastronomía', 'Explora el arte culinario con actividades y experiencias relacionadas con la cocina.', 'gastronomia.jpg'),
('Arte y Cultura', 'Sumérgete en las expresiones artísticas y las tradiciones culturales de todo el mundo.', 'arte-cultura.jpg'),
('Tecnología e Innovación', 'Descubre el mundo de la tecnología con actividades de aprendizaje y desarrollo.', 'tecnologia.jpg'),
('Deportes Acuáticos', 'Practica actividades y deportes en el agua para disfrutar al máximo del verano.', 'deportes-acuaticos.jpg');




CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion_categoria TEXT,
    imagen_categoria VARCHAR(255),
    UNIQUE(nombre_categoria)
);

INSERT INTO Categoria (nombre_categoria, descripcion_categoria, imagen_categoria)
VALUES
('Aventura', 'Disfruta de emocionantes actividades llenas de adrenalina y desafíos al aire libre.', 'aventura.jpg'),
('Gastronomía', 'Explora el arte culinario con actividades y experiencias relacionadas con la cocina.', 'gastronomia.jpg'),
('Arte y Cultura', 'Sumérgete en las expresiones artísticas y las tradiciones culturales de todo el mundo.', 'arte-cultura.jpg'),
('Tecnología e Innovación', 'Descubre el mundo de la tecnología con actividades de aprendizaje y desarrollo.', 'tecnologia.jpg'),
('Deportes Acuáticos', 'Practica actividades y deportes en el agua para disfrutar al máximo del verano.', 'deportes-acuaticos.jpg');
