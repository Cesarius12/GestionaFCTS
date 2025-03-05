-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2025 a las 15:21:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fct_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `genero` enum('Masculino','Femenino','Otro','Prefiero no decirlo') DEFAULT 'Prefiero no decirlo',
  `correo_electronico` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `id_curso` varchar(100) DEFAULT NULL,
  `grado_curso` enum('Grado superior','Grado medio') DEFAULT 'Grado medio',
  `estado` enum('Activo','Suspendido','Graduado') DEFAULT 'Activo',
  `notas_academicas` decimal(4,2) DEFAULT NULL CHECK (`notas_academicas` between 0 and 10),
  `observaciones` text DEFAULT NULL,
  `Empresa` enum('No Asignada','Asignada') DEFAULT 'No Asignada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombre_completo`, `fecha_nacimiento`, `genero`, `correo_electronico`, `telefono`, `direccion`, `id_curso`, `grado_curso`, `estado`, `notas_academicas`, `observaciones`, `Empresa`) VALUES
(1, 'Juan Pérez', '2000-03-13', 'Masculino', 'juan.perez@gmail.com', '123456789', 'Calle Ficticia 123', '1A', 'Grado superior', 'Activo', 8.50, 'Buen rendimiento en general', 'Asignada'),
(2, 'Ana Damasco', '2001-06-22', 'Femenino', 'ana.gomez@example.com', '987654321', 'Calle Imaginaria 456', '2B', 'Grado medio', 'Suspendido', 4.00, 'Necesita mejorar en varias áreas', 'No Asignada'),
(3, 'Carlos López', '1999-10-05', 'Masculino', 'carlos.lopez@gmail.com', '456789123', 'Avenida Principal 789', '3C', 'Grado medio', 'Graduado', 9.00, 'Excelente desempeño', 'Asignada'),
(4, 'María Rodríguez', '2002-01-13', 'Femenino', 'maria.rodriguez@example.com', '321654987', 'Calle Secundaria 321', '1A', 'Grado superior', 'Activo', 7.20, 'Participa en todas las actividades', 'No Asignada'),
(5, 'Pedro Martínez', '2000-09-30', 'Masculino', 'pedro.martinez@gmail.com', '654321987', 'Avenida de la Paz 321', '2B', 'Grado medio', 'Suspendido', 5.50, 'Mejora continua en sus calificaciones', 'Asignada'),
(6, 'Laura Fernández', '2001-11-10', 'Femenino', 'laura.fernandez@example.com', '789123456', 'Calle Real 123', '3C', 'Grado superior', 'Graduado', 9.50, 'Estudiante destacada', 'No Asignada'),
(7, 'Luis Sánchez', '1998-07-18', 'Masculino', 'luis.sanchez@gmail.com', '159753486', 'Calle Libertad 456', '4D', 'Grado medio', 'Activo', 6.80, 'Buenos resultados en los exámenes', 'Asignada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `idCon` int(11) NOT NULL,
  `nombreCompleto` varchar(255) NOT NULL,
  `cargoPuesto` varchar(100) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `correoElectronico` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccionOficina` text DEFAULT NULL,
  `horarioTrabajo` enum('Dia','Tarde') NOT NULL,
  `relacion` enum('Empleado','Contratista','Consultor','Directivo') NOT NULL,
  `fechaIngreso` date DEFAULT NULL,
  `fotoPerfil` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('Activo','Inactivo','En licencia') NOT NULL,
  `notasAdicionales` text DEFAULT NULL,
  `nivelAcceso` enum('Acceso total','Acceso limitado','Administrador de personal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`idCon`, `nombreCompleto`, `cargoPuesto`, `departamento`, `correoElectronico`, `telefono`, `direccionOficina`, `horarioTrabajo`, `relacion`, `fechaIngreso`, `fotoPerfil`, `observaciones`, `estado`, `notasAdicionales`, `nivelAcceso`) VALUES
(1, 'Robin brayan', 'Desarrollador', 'Informacion', 'juanperez@email.com', '1234567890', 'Calle Falsa 123', 'Dia', 'Empleado', '2022-07-31', 'foto1.jpg', 'Observaciones sobre el contacto', 'Activo', 'Notas adicionales sobre Juan', 'Acceso total'),
(2, 'Encarnacion', 'RRHH', 'Ventas', 'anagomez@email.com', '9876543210', 'Avenida Libertad 456', 'Tarde', 'Contratista', '2021-05-10', 'foto2.jpg', 'Entrevistas de reclutamiento en progreso', 'Inactivo', 'Notas adicionales sobre Ana', 'Acceso limitado'),
(3, 'Carlos Pertierra', 'Director', 'Contratacion', 'carlos@email.com', '1122334455', 'Paseo del Sol 789', 'Dia', 'Directivo', '2020-01-15', 'foto3.jpg', 'Revisión de políticas internas', 'Activo', 'Notas adicionales sobre Carlos', 'Administrador de personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `idEmpresa` int(11) NOT NULL,
  `nombreEmpresa` varchar(255) NOT NULL,
  `razonSocial` enum('Publica','Privada') NOT NULL,
  `tipoEmpresa` enum('Sociedad Limitada','Sociedad Anónima','Autónomo') NOT NULL,
  `nifCif` varchar(20) NOT NULL,
  `correoElectronico` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` text NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `codigoPostal` varchar(10) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `fechaConstitucion` date NOT NULL,
  `sectorIndustria` enum('Desarrollo','Sistemas','Diseño') NOT NULL,
  `numEmpleados` int(11) NOT NULL,
  `sitioWeb` varchar(255) DEFAULT NULL,
  `logoEmpresa` varchar(255) DEFAULT NULL,
  `representanteLegal` varchar(255) NOT NULL,
  `estadoEmpresa` enum('Sin contactar','Contactado','Admite alumnos','No admite alumnos') NOT NULL,
  `fechaAlta` date NOT NULL,
  `notasAdicionales` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`idEmpresa`, `nombreEmpresa`, `razonSocial`, `tipoEmpresa`, `nifCif`, `correoElectronico`, `telefono`, `direccion`, `ciudad`, `codigoPostal`, `pais`, `fechaConstitucion`, `sectorIndustria`, `numEmpleados`, `sitioWeb`, `logoEmpresa`, `representanteLegal`, `estadoEmpresa`, `fechaAlta`, `notasAdicionales`) VALUES
(1, 'Tech Innovators S.A.', 'Privada', 'Sociedad Anónima', 'A12345678', 'contact@techinnovators.com', '912345678', 'Calle de la Innovación, 123', 'Madrid', '28001', 'España', '2010-04-15', 'Desarrollo', 50, 'https://www.techinnovators.com', 'https://www.techinnovators.com/logo.png', 'Robin brayan', 'Admite alumnos', '2025-02-01', 'Empresa con enfoque en soluciones tecnológicas avanzadas.'),
(2, 'Diseños Creativos SL', 'Privada', 'Sociedad Limitada', 'B87654321', 'info@dcreativos.com', '933456789', 'Avenida del Diseño, 45', 'Barcelona', '08010', 'España', '2015-08-22', 'Diseño', 30, 'https://www.dcreativos.com', 'https://www.dcreativos.com/logo.png', 'Encarnacion', 'No admite alumnos', '2025-01-31', 'Especialistas en diseño gráfico y branding.'),
(3, 'Sistemas Globales S.L.', 'Privada', 'Sociedad Limitada', 'C11223344', 'contacto@sglobales.com', '944567890', 'Calle de la Tecnología, 78', 'Valencia', '46001', 'España', '2005-01-31', 'Sistemas', 120, 'https://www.sglobales.com', 'https://www.sglobales.com/logo.png', 'Carlos pertierra', 'Contactado', '2025-01-31', 'Proyectos de infraestructura y redes para grandes corporaciones.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `practicas`
--

CREATE TABLE `practicas` (
  `id` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idEmpresa` int(11) DEFAULT NULL,
  `estadoEmp` enum('NO REALIZA PRACTICAS','PENDIENTE ASIGNACION DE PRACTICAS','ASIGNADO A EMPRESA','PENDIENTE CONVENIO','REALIZADO CONVENIO','PENDIENTE RELACION DE ALUMNOS','REALIZADO RELACION DE ALUMNOS','PENDIENTE PROGRAMA y HORARIO','REALIZADO PROGRAMA y HORARIO','PENDIENTE EVALUCIÓN EMPRESA','REALIZADA EVALUACION EMPRESA','PENDIENTE HOJAS DE FIRMAS','REALIZADAS HOJAS DE FIRMAS','PENDIENTE ENVIO DOCUMENTACION','FINALIZADAS') NOT NULL,
  `nombreEmp` varchar(255) DEFAULT NULL,
  `cifEmp` varchar(50) DEFAULT NULL,
  `direccionEmp` text DEFAULT NULL,
  `tipoEmp` enum('Sociedad Anónima','Sociedad Limitada','Autonomo','Otra') DEFAULT NULL,
  `nombreRep` varchar(255) DEFAULT NULL,
  `dniRep` varchar(20) DEFAULT NULL,
  `cargoRep` enum('Director','RRHH','Desarrollador') DEFAULT NULL,
  `persCon` varchar(255) DEFAULT NULL,
  `emailCon` varchar(255) DEFAULT NULL,
  `telfCon` varchar(20) DEFAULT NULL,
  `nombreTut` varchar(255) DEFAULT NULL,
  `dniTut` varchar(20) DEFAULT NULL,
  `emailTut` varchar(255) DEFAULT NULL,
  `dirPrac` varchar(255) DEFAULT NULL,
  `diaDeFirma` date DEFAULT NULL,
  `firmaConv` enum('Pendiente realizacion de Convenio','Pendiente envio de empresa','Pendiente firma de empresa','pendiente firma director','Pendiente envio empresa','Enviado a empresa') DEFAULT NULL,
  `firmaRel` enum('Pendiente realizacion de relacion','Pendiente envio de empresa','Pendiente firma de empresa','Pendiente firma director','Pendiente envio empresa','Enviado a empresa') DEFAULT NULL,
  `firmaSem` enum('Pendiente realizacion de programa','Pendiente envio de empresa','Pendiente firma de empresa','Pendiente firma tutor de centro','Pendiente envio empresa','Enviado a empresa') DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `horario` enum('Dia','Tarde') DEFAULT NULL,
  `numHoras` int(11) DEFAULT NULL,
  `modalidad` enum('Presencial','Teletrabajo') DEFAULT NULL,
  `idTutor` int(11) NOT NULL,
  `idContacto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `practicas`
--

INSERT INTO `practicas` (`id`, `idAlumno`, `idEmpresa`, `estadoEmp`, `nombreEmp`, `cifEmp`, `direccionEmp`, `tipoEmp`, `nombreRep`, `dniRep`, `cargoRep`, `persCon`, `emailCon`, `telfCon`, `nombreTut`, `dniTut`, `emailTut`, `dirPrac`, `diaDeFirma`, `firmaConv`, `firmaRel`, `firmaSem`, `fechaInicio`, `fechaFin`, `horario`, `numHoras`, `modalidad`, `idTutor`, `idContacto`) VALUES
(1, 1, 1, 'ASIGNADO A EMPRESA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-30', '2025-01-30', 'Dia', 23, 'Presencial', 1, 1),
(2, 2, 2, 'PENDIENTE ASIGNACION DE PRACTICAS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 2),
(3, 3, NULL, 'PENDIENTE ASIGNACION DE PRACTICAS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(4, 4, NULL, 'NO REALIZA PRACTICAS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(5, 5, NULL, 'REALIZADO RELACION DE ALUMNOS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL),
(6, 6, NULL, 'FINALIZADAS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `id_profesor` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `departamento` enum('1DAW','2DAW','1DAM','2DAM') NOT NULL,
  `rol` enum('profesor','tutor') NOT NULL,
  `estado` enum('Activo','En licencia','Inactivo') NOT NULL,
  `tipo_contrato` enum('Tiempo Completo','Medio Tiempo','Sustituto') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`id_profesor`, `nombre`, `dni`, `email`, `telefono`, `departamento`, `rol`, `estado`, `tipo_contrato`) VALUES
(1, 'Ana perez', '12345554A', 'AnaP@prueba.com', '123456666', '2DAM', 'tutor', 'Activo', 'Medio Tiempo'),
(2, 'Juan Sanchez', '11111111A', 'juanS@prueba.com', '123465653', '2DAW', 'profesor', 'Activo', 'Tiempo Completo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento`
--

CREATE TABLE `seguimiento` (
  `id_seguimiento` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_contacto` int(11) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `tipo` enum('Llamada','Correo','Reunión') NOT NULL,
  `detalle` text NOT NULL,
  `proximo_paso` text DEFAULT NULL,
  `fechaProx` datetime DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seguimiento`
--

INSERT INTO `seguimiento` (`id_seguimiento`, `id_empresa`, `id_contacto`, `fecha`, `tipo`, `detalle`, `proximo_paso`, `fechaProx`, `observaciones`) VALUES
(1, 2, 3, '2025-02-23 11:06:00', 'Llamada', '1ra llam', '2da llam', '2025-02-28 11:06:00', 'prueba'),
(2, 2, 2, '2025-02-01 13:09:00', 'Correo', 'asdfa', 'asdf', '2025-03-01 13:09:00', 'asd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(15) NOT NULL,
  `tipo` enum('admin','profesor','tutor','alumno') NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `username`, `password`, `tipo`, `id_user`) VALUES
('Administrador', 'admin1', 'adm1', 'admin', 1),
('Ana perez', 'profesor1', 'prof1', 'tutor', 2),
('Juan Sanchez', 'profesor2', 'prof2', 'profesor', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`idCon`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`idEmpresa`);

--
-- Indices de la tabla `practicas`
--
ALTER TABLE `practicas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`id_profesor`);

--
-- Indices de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD PRIMARY KEY (`id_seguimiento`),
  ADD KEY `fk_se` (`id_empresa`),
  ADD KEY `fk_sc` (`id_contacto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `idCon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `idEmpresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `practicas`
--
ALTER TABLE `practicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `id_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  MODIFY `id_seguimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `seguimiento`
--
ALTER TABLE `seguimiento`
  ADD CONSTRAINT `fk_sc` FOREIGN KEY (`id_contacto`) REFERENCES `contactos` (`idCon`),
  ADD CONSTRAINT `fk_se` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`idEmpresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
