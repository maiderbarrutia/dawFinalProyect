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
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Company (company_name, company_type, company_logo, company_cif, contact_person, company_phone, company_address, company_website, company_email, company_password)
VALUES
('GreenTech Solutions', 'Energías Renovables', 'logo-batt-base.png', 'CIF101', 'Laura Martínez', '111222333', 'Calle Verde 45, Madrid, España', 'http://greentech-solutions.com', 'contacto@greentech.com', 'passwordGT'),
('Foodie Factory', 'Gastronomía', 'logo-healthy-life.png', 'CIF102', 'Carlos Rodríguez', '222333444', 'Avenida Sabor 78, Valencia, España', 'http://foodiefactory.com', 'contacto@foodie.com', 'passwordFF'),
('EducaMasters', 'Educación Online', 'logo-running.png', 'CIF103', 'María Fernández', '333444555', 'Plaza del Saber 12, Barcelona, España', 'http://educamasters.com', 'contacto@educamasters.com', 'passwordEM'),
('FitLife Gym', 'Fitness', 'logo-storm.png', 'CIF104', 'Juan García', '444555666', 'Polígono Deportivo 9, Sevilla, España', 'http://fitlifegym.com', 'contacto@fitlife.com', 'passwordFL'),
('CodeCraft', 'Tecnología y Software', 'logo-strike.png', 'CIF105', 'Ana López', '555666777', 'Calle Innovación 23, Bilbao, España', 'http://codecraft.com', 'contacto@codecraft.com', 'passwordCC');

INSERT INTO Company (company_name, company_type, company_logo, company_cif, contact_person, company_phone, company_address, company_website, company_email, company_password)
VALUES
('The Culture Hub', 'Art & Culture', 'logo-the-culture.png', 'CIF106', 'Claudia Méndez', '666777888', 'Calle Arte 10, Madrid, Spain', 'http://theculturehub.com', 'contact@theculturehub.com', 'passwordTC'),
('VeloMax', 'Sustainable Mobility', 'logo-velo-max.png', 'CIF107', 'Héctor Ruiz', '777888999', 'Avenida Ciclista 42, Valencia, Spain', 'http://velomax.com', 'contact@velomax.com', 'passwordVM'),
('Wellness One', 'Health & Wellness', 'logo-wellness.png', 'CIF108', 'Nuria Blanco', '888999000', 'Calle Salud 25, Sevilla, Spain', 'http://wellnessone.com', 'contact@wellnessone.com', 'passwordWO'),
('BattBase', 'Energy Technology', 'logo-batt-base1.png', 'CIF109', 'Andrés León', '999000111', 'Energy Industrial Park, Building 12, Bilbao, Spain', 'http://battbase.com', 'contact@battbase.com', 'passwordBB'),
('Running Pro', 'Sports & Training', 'logo-running.png', 'CIF110', 'Patricia Gil', '000111222', 'Sports Avenue 88, Barcelona, Spain', 'http://runningpro.com', 'contact@runningpro.com', 'passwordRP');


CREATE TABLE Empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(255) NOT NULL,
    tipo_empresa VARCHAR(100),
    logo_empresa VARCHAR(255),
    cif_empresa VARCHAR(20) UNIQUE,
    persona_contacto VARCHAR(255),
    telefono_empresa VARCHAR(20),
    direccion_empresa TEXT,
    web_empresa VARCHAR(255),
    email_empresa VARCHAR(255) UNIQUE,
    contrasena_empresa VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Empresa (nombre_empresa, tipo_empresa, logo_empresa, cif_empresa, persona_contacto, telefono_empresa, direccion_empresa, web_empresa, email_empresa, contrasena_empresa)
VALUES
('GreenTech Solutions', 'Energías Renovables', 'logo_greentech.png', 'CIF101', 'Laura Martínez', '111222333', 'Calle Verde 45, Madrid, España', 'http://greentech-solutions.com', 'contacto@greentech.com', 'passwordGT'),
('Foodie Factory', 'Gastronomía', 'logo_foodie.png', 'CIF102', 'Carlos Rodríguez', '222333444', 'Avenida Sabor 78, Valencia, España', 'http://foodiefactory.com', 'contacto@foodie.com', 'passwordFF'),
('EducaMasters', 'Educación Online', 'logo_educa.png', 'CIF103', 'María Fernández', '333444555', 'Plaza del Saber 12, Barcelona, España', 'http://educamasters.com', 'contacto@educamasters.com', 'passwordEM'),
('FitLife Gym', 'Fitness', 'logo_fitlife.png', 'CIF104', 'Juan García', '444555666', 'Polígono Deportivo 9, Sevilla, España', 'http://fitlifegym.com', 'contacto@fitlife.com', 'passwordFL'),
('CodeCraft', 'Tecnología y Software', 'logo_codecraft.png', 'CIF105', 'Ana López', '555666777', 'Calle Innovación 23, Bilbao, España', 'http://codecraft.com', 'contacto@codecraft.com', 'passwordCC');

