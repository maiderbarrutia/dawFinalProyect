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
