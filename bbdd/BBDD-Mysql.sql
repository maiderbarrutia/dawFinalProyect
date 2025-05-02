-- Crear la tabla
CREATE DATABASE IF NOT EXISTS aisiplan;

-- Crear el usuario
CREATE USER IF NOT EXISTS 'aisiPlan_user'@'localhost' IDENTIFIED BY 'Zp8!rA7k@Xv2Lm9';

-- Dar todos los privilegios al usuario
GRANT ALL PRIVILEGES ON aisiplan.* TO 'aisiPlan_user'@'localhost';

-- Crear tabla de categorias
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    category_description TEXT,
    category_image VARCHAR(255),
    
    INDEX idx_category_name (category_name)
);

-- Crear tabla de usuarios
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

-- Crear tabla empresas
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

-- Crear tabla de actividades
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

-- Crear tabla de inscripciones
CREATE TABLE Registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES UserData(user_id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES Activity(activity_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_activity_id (activity_id)  
);
