-- Crear la tabla "aire" con "date" auto-generada
CREATE TABLE aire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla "humedad" con "date" auto-generada
CREATE TABLE humedad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla "luz" con "date" auto-generada
CREATE TABLE luz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla "temperatura" con "date" auto-generada
CREATE TABLE temperatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE distancia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value FLOAT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
