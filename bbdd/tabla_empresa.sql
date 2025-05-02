CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_type VARCHAR(100),
    company_logo VARCHAR(255),
    company_cif VARCHAR(20) UNIQUE,
    contact_person VARCHAR(255),
    company_phone VARCHAR(20),
    company_address TEXT,
    company_website VARCHAR(255),
    company_email VARCHAR(255) UNIQUE,
    company_password VARCHAR(255) NOT NULL,
    privacy_policy  BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_company_email (company_email),
    INDEX idx_company_cif (company_cif)  
);

INSERT INTO Company (company_name, company_type, company_logo, company_cif, contact_person, company_phone, company_address, company_website, company_email, company_password, privacy_policy)
VALUES
('Batt Base', 'Gimnasio', 'batt-base.png', 'B12345678', 'Laura Sánchez', '912345678', 'Calle Salud 10, Madrid', 'https://battbase.es', 'info@battbase.es', 'hashedpass1', TRUE),
('Healthy Life', 'Centro de Bienestar', 'healthy-life.png', 'B23456789', 'Carlos Romero', '913456789', 'Camino Sierra 23, Segovia', 'https://healthylife.com', 'contacto@healthylife.com', 'hashedpass2', TRUE),
('Running Club', 'Club Deportivo', 'running.png', 'B34567890', 'Marta Gil', '914567890', 'Calle Tranquila 15, Valencia', 'https://runningclub.es', 'info@runningclub.es', 'hashedpass3', TRUE),
('Storm Adventures', 'Turismo Aventura', 'storm.png', 'B45678901', 'David Moreno', '915678901', 'Avenida Historia 77, Sevilla', 'https://stormadventures.com', 'eventos@stormadventures.com', 'hashedpass4', TRUE),
('Strike Sports', 'Club Deportivo', 'strike.png', 'B56789012', 'Sara Rivas', '916789012', 'Calle Diversión 45, Barcelona', 'https://strikesports.net', 'hello@strikesports.net', 'hashedpass5', TRUE),
('The Culture', 'Organización Cultural', 'the-culture.png', 'B67890123', 'Luis Pérez', '917890123', 'Plaza Arte 5, Madrid', 'https://theculture.org', 'contacto@theculture.org', 'hashedpass6', TRUE),
('Velo Max', 'Turismo Activo', 'velo-max.png', 'B78901234', 'Ana Gómez', '918901234', 'Avenida Viento 19, Barcelona', 'https://velomax.com', 'info@velomax.com', 'hashedpass7', TRUE),
('Wellness Center', 'Bienestar y Relax', 'wellness.png', 'B89012345', 'José Martínez', '919012345', 'Calle Serenidad 33, Valencia', 'https://wellnesscenter.es', 'contacto@wellnesscenter.es', 'hashedpass8', TRUE);
