
--creacion tabla usuarios--
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `nombre` varchar(250) NOT NULL COMMENT 'nombre cliente',
  `apellidos` varchar(250) NOT NULL COMMENT 'Apellidos cliente',
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `fechaAlta` date NOT NULL,
  PRIMARY KEY (`id`)
)
--creacion tabla operaciones--
CREATE TABLE IF NOT EXISTS `operaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `concepto` text NOT NULL COMMENT 'concepto',
  `monto` decimal(11,2) NOT NULL,
  `fecha` date NOT NULL,
  `id_tipo_operacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date,
  PRIMARY KEY (`id`)
);
--creacion de tabla tipo operacion--
CREATE TABLE IF NOT EXISTS `tipo_operaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave primaria',
  `descripcion` text NOT NULL COMMENT 'descripcion',
  PRIMARY KEY (`id`)
);

--inser datos estaticos--
insert into tipo_operaciones (descripcion) values ('Ingreso');
insert into tipo_operaciones (descripcion) values ('Egreso');