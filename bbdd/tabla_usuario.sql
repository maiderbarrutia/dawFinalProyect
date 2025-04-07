CREATE TABLE UserData (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_phone VARCHAR(20),
    user_city VARCHAR(255),
    user_password VARCHAR(255),
    privacy_policy  BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO UserData (first_name, last_name, user_email, user_phone, user_city, user_password, privacy_policy)
VALUES
('Laura', 'Martínez', 'laura.martinez@mail.com', '600111222', 'Madrid', 'password1', FALSE),
('Pedro', 'Gómez', 'pedro.gomez@mail.com', '700222333', 'Barcelona', 'password2', TRUE),
('Silvia', 'Hernández', 'silvia.hernandez@mail.com', '800333444', 'Valencia', 'password3', FALSE), 
('Diego', 'López', 'diego.lopez@mail.com', '900444555', 'Sevilla', 'password4', FALSE),
('Lucía', 'Rodríguez', 'lucia.rodriguez@mail.com', '100555666', 'Bilbao', 'password5', TRUE);



CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    apellidos_usuario VARCHAR(100),
    email_usuario VARCHAR(255) UNIQUE NOT NULL,
    telefono_usuario VARCHAR(20),
    ciudad_usuario VARCHAR(255),
    contrasena_usuario VARCHAR(255), -- Para futuros accesos registrados
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Usuario (nombre_usuario, apellidos_usuario, email_usuario, telefono_usuario, ciudad_usuario, contrasena_usuario)
VALUES
('Laura', 'Martínez', 'laura.martinez@mail.com', '600111222', 'Madrid', 'password1'),
('Pedro', 'Gómez', 'pedro.gomez@mail.com', '700222333', 'Barcelona', 'password2'),
('Silvia', 'Hernández', 'silvia.hernandez@mail.com', '800333444', 'Valencia', 'password3'),
('Diego', 'López', 'diego.lopez@mail.com', '900444555', 'Sevilla', 'password4'),
('Lucía', 'Rodríguez', 'lucia.rodriguez@mail.com', '100555666', 'Bilbao', 'password5');
