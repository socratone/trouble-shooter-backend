CREATE DATABASE trouble_shooter;
USE trouble_shooter;

CREATE TABLE item (
	id int NOT NULL AUTO_INCREMENT, 
    title varchar(255) NOT NULL,
    category varchar(255) NOT NULL,
    createdAt DATETIME NOT NULL, 
    page varchar(8000) NOT NULL,
    UNIQUE (id),
    PRIMARY KEY (id)
);