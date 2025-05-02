CREATE TABLE Activity (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    activity_title VARCHAR(255) NOT NULL,
    activity_description TEXT,
    company_id INT NOT NULL,
    activity_date DATE,
    activity_time TIME,
    activity_price DECIMAL(10, 2),
    available_slots INT,
    activity_duration INT,
    difficulty_level ENUM('easy', 'medium', 'hard'),
    activity_type VARCHAR(100),
    category_id INT,
    activity_location TEXT,
    activity_adress TEXT,
    activity_images JSON,
    activity_videos JSON,
    includes TEXT,
    excludes TEXT,
    privacy_policy BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) ON DELETE SET NULL,
    INDEX idx_category_id (category_id),
    INDEX idx_activity_date (activity_date),
    INDEX idx_activity_company_id (company_id) 
);

-- Inserción de Actividades
INSERT INTO Activity (activity_title, activity_description, company_id, activity_date, activity_time, activity_price, available_slots, activity_duration, difficulty_level, activity_type, category_id, activity_location, activity_images, activity_videos, includes, excludes, privacy_policy)
VALUES
('Zumba en grupo', 'Clase de Zumba para todas las edades y niveles de habilidad.', 1, '2025-05-01', '10:00:00', 15.00, 20, 60, 'medium', 'Deportes', 1, 'Calle Salud 10, Madrid', '["zumba1.jpg", "zumba2.jpg"]', '[]', 'Clase dirigida por un instructor profesional.', 'No se permite la grabación de videos durante la clase.', TRUE),
('Yoga para principiantes', 'Sesión de yoga para aliviar el estrés y mejorar la flexibilidad.', 2, '2025-05-02', '09:00:00', 10.00, 15, 90, 'easy', 'Bienestar y relajación', 2, 'Camino Sierra 23, Segovia', '["yoga1.jpg", "yoga2.jpg"]', '[]', 'Instrucción personal en poses básicas.', 'No se permite grabar durante la sesión.', TRUE),
('Maratón 10k', 'Competición de 10 kilómetros para corredores de todos los niveles.', 3, '2025-06-01', '07:00:00', 25.50, 100, 120, 'hard', 'Deportes', 1, 'Calle Tranquila 15, Valencia', '["maraton.jpg"]', '[]', 'Kit de carrera incluido.', 'Sin devolución de inscripciones.', TRUE),
('Escalada en roca', 'Aventura de escalada para todos los niveles de experiencia.', 4, '2025-07-10', '08:30:00', 40.00, 12, 180, 'hard', 'Aventura', 4, 'Avenida Historia 77, Sevilla', '["escalada1.jpg", "escalada2.jpg"]', '[]', 'Equipo de escalada proporcionado.', 'No se permite el uso de cámaras personales.', TRUE),
('Tour cultural por Madrid', 'Recorrido guiado por los principales puntos históricos de Madrid.', 5, '2025-05-15', '10:00:00', 20.00, 30, 120, 'medium', 'Cultura', 3, 'Plaza Mayor, Madrid', '["madrid-tour1.jpg", "madrid-tour2.jpg"]', '[]', 'Guía turístico experto incluido.', 'El tour no incluye entradas a museos.', TRUE),
('Excursión en kayak', 'Aventura en kayak por los ríos de la región.', 6, '2025-08-05', '09:00:00', 35.00, 15, 120, 'medium', 'Aventura', 4, 'Río Ebro, Zaragoza', '["kayak1.jpg"]', '[]', 'Equipo de kayak proporcionado.', 'No se permiten grupos mayores de 5 personas.', TRUE),
('Cine al aire libre', 'Disfruta de una película bajo las estrellas en nuestra proyección al aire libre.', 7, '2025-06-10', '21:00:00', 8.00, 50, 120, 'easy', 'Entretenimiento', 5, 'Parque Central, Barcelona', '["cine1.jpg", "cine2.jpg"]', '[]', 'Palomitas y refresco incluidos.', 'No se permite grabar la película.', TRUE),
('Bailes latinos', 'Aprende a bailar salsa, bachata y merengue en esta clase divertida y enérgica.', 8, '2025-09-01', '18:00:00', 12.00, 25, 60, 'medium', 'Entretenimiento', 5, 'Calle Alegría 4, Valencia', '["bailes1.jpg"]', '[]', 'Clase dirigida por un instructor experimentado.', 'No se permite el uso de teléfonos durante la clase.', TRUE);
