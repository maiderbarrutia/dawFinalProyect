CREATE TABLE Actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    titulo_actividad VARCHAR(255) NOT NULL,
    descripcion_actividad TEXT,
    empresa_id INT NOT NULL,
    fecha_actividad DATE,
    hora_actividad TIME,
    precio_actividad DECIMAL(10, 2),
    numero_plazas INT,
    duracion_actividad INT,
    nivel_dificultad ENUM('fácil', 'medio', 'difícil'),
    tipo_actividad VARCHAR(100),
    categoria_id INT,
    ubicacion_actividad TEXT,
    imagenes_actividad JSON,
    videos_actividad JSON,
    incluye TEXT,
    no_incluye TEXT,
    politica_privacidad BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (empresa_id) REFERENCES Empresa(id_empresa) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id_categoria) ON DELETE SET NULL,
    INDEX (categoria_id),
    INDEX (fecha_actividad)
);

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
    ubicacion_actividad,
    imagenes_actividad,
    videos_actividad,
    incluye,
    no_incluye,
    politica_privacidad
)
VALUES
('Taller de Programación', 'Aprende a programar desde cero', 1, '2025-04-01', '10:00:00', 50.00, 20, 120, 'fácil', 'Workshop', 1, 'Madrid', '[\"image1.jpg\"]', '[\"video1.mp4\"]', 'Materiales y refrigerio', 'Transporte', TRUE),
('Curso de Primeros Auxilios', 'Curso práctico sobre cómo actuar en emergencias', 3, '2025-04-15', '14:00:00', 100.00, 15, 240, 'medio', 'Curso', 3, 'Valencia', '[\"image2.jpg\"]', '[\"video2.mp4\"]', 'Certificado y material', 'Comida', TRUE),
('Taller de Pintura', 'Explora tu creatividad con pintura acrílica', 4, '2025-05-01', '09:00:00', 40.00, 10, 180, 'fácil', 'Arte', 5, 'Bilbao', '[\"image3.jpg\"]', '[\"video3.mp4\"]', 'Material y guía', 'Transporte', TRUE),
('Clínica Deportiva', 'Mejora tus habilidades en fútbol', 4, '2025-03-30', '11:00:00', 30.00, 30, 90, 'difícil', 'Deporte', 4, 'Sevilla', '[\"image4.jpg\"]', '[\"video4.mp4\"]', 'Entrenadores y equipo', 'Transporte', FALSE),
('Charla de Tecnología', 'Descubre las tendencias actuales', 1, '2025-06-01', '16:00:00', 0.00, 100, 60, 'fácil', 'Charla', 1, 'Madrid', '[\"image5.jpg\"]', '[\"video5.mp4\"]', 'Presentación y material', 'Refrigerio', TRUE);

