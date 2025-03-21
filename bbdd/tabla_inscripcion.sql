CREATE TABLE Inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    actividad_id INT NOT NULL,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (actividad_id) REFERENCES Actividad(id_actividad) ON DELETE CASCADE,
    INDEX (usuario_id),
    INDEX (actividad_id)
);


INSERT INTO Inscripcion (usuario_id, actividad_id, fecha_inscripcion)
VALUES
(1, 1, NOW()),
(2, 2, NOW()),
(3, 3, NOW()),
(4, 4, NOW()),
(5, 5, NOW());
