DROP DATABASE IF EXISTS nestjs;

CREATE DATABASE nestjs;

USE nestjs;



CREATE TABLE pessoas (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(255) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL,

    ativo BOOLEAN DEFAULT TRUE,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP

);



INSERT INTO pessoas 
(nome, email, senha, ativo)
VALUES
('João', 'joao@email.com', '123456', TRUE);



INSERT INTO pessoas 
(nome, email, senha, ativo)
VALUES
('Maria', 'maria@email.com', '123456', TRUE);




SELECT * FROM pessoas;