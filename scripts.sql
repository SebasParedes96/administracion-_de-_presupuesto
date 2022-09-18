
--create table ussers--
CREATE TABLE IF NOT EXISTS `ussers` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `name` varchar(250) NOT NULL COMMENT 'nombre cliente',
  `lastName` varchar(250) NOT NULL COMMENT 'Apellidos cliente',
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `startDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);
--create table operations--
CREATE TABLE IF NOT EXISTS `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `concept` text NOT NULL COMMENT 'concepto',
  `amount` decimal(11,2) NOT NULL,
  `date` date NOT NULL,
  `id_category` int(11) NOT NULL,
  `id_type_operation` int(11) NOT NULL,
  `id_usser` int(11) NOT NULL,
  `startDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `leavingDate` TIMESTAMP,
  PRIMARY KEY (`id`)
);
--create table type_operations--
CREATE TABLE IF NOT EXISTS `type_operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `description` text NOT NULL COMMENT 'descripcion',
  PRIMARY KEY (`id`)
);

-- create table categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `description` text NOT NULL COMMENT 'descripcion',
  PRIMARY KEY (`id`)
);

--insert static data--
insert into type_operations (description) values ('Ingreso'),('Egreso');

insert into categories (description) values ('sin categoria'),('servicio'),('compra'),('comida'),('trasporte'),('varios');

