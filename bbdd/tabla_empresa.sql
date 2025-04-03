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

