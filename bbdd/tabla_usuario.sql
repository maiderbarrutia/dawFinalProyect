CREATE TABLE UserData (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_phone VARCHAR(20),
    user_city VARCHAR(255),
    user_password VARCHAR(255),
    privacy_policy  BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_email (user_email),
    INDEX idx_user_phone (user_phone)
);

-- Inserción de Usuarios
INSERT INTO UserData (first_name, last_name, user_email, user_phone, user_city, user_password, privacy_policy)
VALUES
('Ana', 'Gómez', 'ana.gomez@mail.com', '612345678', 'Madrid', 'hashedpass1', TRUE),
('Luis', 'Martínez', 'luis.martinez@mail.com', '613456789', 'Barcelona', 'hashedpass2', TRUE),
('Pedro', 'Sánchez', 'pedro.sanchez@mail.com', '614567890', 'Sevilla', 'hashedpass3', TRUE),
('Marta', 'López', 'marta.lopez@mail.com', '615678901', 'Valencia', 'hashedpass4', TRUE),
('Carlos', 'Pérez', 'carlos.perez@mail.com', '616789012', 'Zaragoza', 'hashedpass5', TRUE),
('Laura', 'García', 'laura.garcia@mail.com', '617890123', 'Madrid', 'hashedpass6', TRUE),
('José', 'Fernández', 'jose.fernandez@mail.com', '618901234', 'Bilbao', 'hashedpass7', TRUE),
('Sofía', 'Rodríguez', 'sofia.rodriguez@mail.com', '619012345', 'Malaga', 'hashedpass8', TRUE),
('Raúl', 'Díaz', 'raul.diaz@mail.com', '620123456', 'Murcia', 'hashedpass9', TRUE),
('Paula', 'Vázquez', 'paula.vazquez@mail.com', '621234567', 'Granada', 'hashedpass10', TRUE);
