DROP DATABASE IF EXISTS `transporters`;
CREATE DATABASE `transporters`;
USE `transporters`;
-- brand
CREATE TABLE IF NOT EXISTS `brands` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL UNIQUE
);
-- truck
CREATE TABLE IF NOT EXISTS `trucks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `brand` INT NOT NULL,
    `truck_load` INT NOT NULL,
    `capacity` INT NOT NULL,
    `year` VARCHAR(4) NOT NULL,
    `repairs` INT NOT NULL,
    FOREIGN KEY (`brand`) REFERENCES `brands`(`id`) ON DELETE CASCADE
);
-- seniority
CREATE TABLE IF NOT EXISTS `seniorities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `seniority` VARCHAR(20) NOT NULL
);
-- seniorities
INSERT IGNORE INTO `seniorities`(seniority) VALUES
    ("C.E.O."),
    ("Manager"),
    ("Supervisor"),
    ("Security"),
    ("Janitor"),
    ("IT Manager"),
    ("HR"),
    ("Other");

-- employee
CREATE TABLE IF NOT EXISTS `employees` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `surname` VARCHAR(20) NOT NULL,
    `seniority` INT NOT NULL,
    FOREIGN KEY(`seniority`) REFERENCES `seniorities`(`id`) ON DELETE CASCADE
);
-- category
CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(20) NOT NULL UNIQUE
);
-- categories
INSERT IGNORE INTO `categories` (`category`) VALUES
    ("A"),
    ("B"),
    ("C"),
    ("D"),
    ("E");
-- driver
CREATE TABLE IF NOT EXISTS `drivers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `employee_id` INT NOT NULL UNIQUE,
    `category` INT NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE CASCADE
);
-- mechanic
CREATE TABLE IF NOT EXISTS `mechanics` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `employee_id` INT NOT NULL UNIQUE,
    `brand_specialized` INT NOT NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`brand_specialized`) REFERENCES `brands`(`id`) ON DELETE CASCADE
);
-- repairs
CREATE TABLE IF NOT EXISTS `repairs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `truck_id` INT NOT NULL,
    `mechanic_id` INT NOT NULL,
    -- in days
    `estimated_time` INT NOT NULL,
    FOREIGN KEY (`truck_id`) REFERENCES `trucks`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`mechanic_id`) REFERENCES `mechanics`(`id`) ON DELETE CASCADE
);
-- customers
CREATE TABLE IF NOT EXISTS `customers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `surname` VARCHAR(20) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `phone1` VARCHAR(13) NOT NULL UNIQUE,
    `phone2` VARCHAR(13) NOT NULL UNIQUE
);
-- shipment
CREATE TABLE IF NOT EXISTS `shipments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `customer_id` INT NOT NULL,
    `weight` INT NOT NULL,
    `value` INT NOT NULL,
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE
);
-- trip
CREATE TABLE IF NOT EXISTS `trips` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `route_from` VARCHAR(20) NOT NULL,
    `route_to` VARCHAR(20) NOT NULL,
    `driver1_id` INT NOT NULL,
    -- -1 if there is no second driver
    `driver2_id` INT NULL DEFAULT NULL,
    FOREIGN KEY (`driver1_id`) REFERENCES `drivers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`driver2_id`) REFERENCES `drivers`(`id`) ON DELETE CASCADE
);
-- shipment trip
CREATE TABLE IF NOT EXISTS `shipment_trips` (
    `shipment_id` INT NOT NULL,
    `trip_id` INT NOT NULL,
    PRIMARY KEY (`shipment_id`, `trip_id`),
    FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE
);
