DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
customer_cost DECIMAL(10,2) NOT NULL,
product_sales INT NOT NULL, 
stock_qty INT NOT NULL,
PRIMARY KEY (id));

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
department_id INT NOT NULL,
department_name VARCHAR(40) NOT NULL,
overhead_cost DECIMAL(10,2) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, customer_cost, product_sales, stock_qty)
VALUES ("Cherubim","Celestial Entities", 39.95, 15, 47), 
("Better Angels", "Celestial Entities", 75.00, 4, 30), 
("Rhodochrosite", "Pretty Rocks", 60.00, 91, 189), 
("Celtic Sea Salt", "Kitchen Witchery", 10.00, 300, 400), 
("Mugwort Flakes", "Kitchen Witchery", 6.00, 133, 200), 
("Amethyst", "Pretty Rocks", 25.00, 17, 25), 
("Small Mirror", "Skrying Out Loud", 15.00, 56, 100), 
("Large Mirror", "Skrying Out Loud", 45.00, 43, 100), 
("Tabletop Crystal Ball", "Skrying Out Loud", 395.00, 5, 20), 
("Smoky Quartz", "Pretty Rocks", 36.00, 39, 100)