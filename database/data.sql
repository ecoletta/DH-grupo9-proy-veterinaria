CREATE DATABASE `veterinaria`;

CREATE TABLE `veterinaria`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `category` VARCHAR(15) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `veterinaria`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `id_category` INT NOT NULL,
  `stock` INT NOT NULL,
  `price` INT NOT NULL,
  `discount` INT NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `veterinaria`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC));

ALTER TABLE `veterinaria`.`productos` 
ADD INDEX `id_idx` (`id_category` ASC);
;

ALTER TABLE `veterinaria`.`productos` 
ADD CONSTRAINT `id`
  FOREIGN KEY (`id_category`)
  REFERENCES `veterinaria`.`categorias` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;