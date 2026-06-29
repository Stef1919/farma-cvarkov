-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 29, 2026 at 07:02 PM
-- Server version: 10.3.39-MariaDB-0ubuntu0.20.04.2
-- PHP Version: 7.4.3-4ubuntu2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SISIII2026_89221092`
--

-- --------------------------------------------------------

--
-- Table structure for table `hrana`
--

CREATE TABLE `hrana` (
  `id` int(11) NOT NULL,
  `naziv` varchar(100) DEFAULT NULL,
  `tip` enum('psenica','koruza','vitamin') DEFAULT NULL,
  `kolicina` int(11) DEFAULT NULL,
  `cena` decimal(10,2) DEFAULT NULL,
  `rok_uporabe` date DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hrana`
--

INSERT INTO `hrana` (`id`, `naziv`, `tip`, `kolicina`, `cena`, `rok_uporabe`, `korisnik_id`) VALUES
(1, 'Premium', 'psenica', 100, '25.50', '2026-12-31', 1),
(2, 'Mix A', 'koruza', 80, '19.90', '2026-11-30', 2),
(3, 'Vitamin A', 'vitamin', 30, '9.50', '2027-01-15', 2),
(4, 'Premium B', 'psenica', 120, '30.00', '2026-10-10', 3),
(5, 'Mix B', 'koruza', 70, '18.20', '2026-09-01', 4);

-- --------------------------------------------------------

--
-- Table structure for table `hrana_perad`
--

CREATE TABLE `hrana_perad` (
  `id` int(11) NOT NULL,
  `hrana_id` int(11) DEFAULT NULL,
  `perad_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `hrana_perad`
--

INSERT INTO `hrana_perad` (`id`, `hrana_id`, `perad_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `ime` varchar(100) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `naslov` varchar(100) DEFAULT NULL,
  `vloga` enum('delavec','dostavljalec','kupec','admin') DEFAULT NULL,
  `geslo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `ime`, `telefon`, `email`, `naslov`, `vloga`, `geslo`) VALUES
(1, 'Marko', '040111111', 'marko@mail.com', 'Ljubljana', 'admin', '1234'),
(2, 'Ana', '040222222', 'ana@mail.com', 'Maribor', 'delavec', '1234'),
(3, 'Ivan', '040333333', 'ivan@mail.com', 'Celje', 'kupec', '1234'),
(4, 'Petra', '040444444', 'petra@mail.com', 'Koper', 'dostavljalec', '1234'),
(5, 'Sara', '040555555', 'sara@mail.com', 'Novo mesto', 'delavec', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `perad`
--

CREATE TABLE `perad` (
  `id` int(11) NOT NULL,
  `vrsta` varchar(100) DEFAULT NULL,
  `starost` int(11) DEFAULT NULL,
  `spol` enum('moski','zenski') DEFAULT NULL,
  `kolicina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `perad`
--

INSERT INTO `perad` (`id`, `vrsta`, `starost`, `spol`, `kolicina`) VALUES
(1, 'Kokoš', 2, 'zenski', 50),
(2, 'Petelin', 3, 'moski', 10),
(3, 'Raca', 1, 'zenski', 20),
(4, 'Gos', 4, 'moski', 8),
(5, 'Puranka', 2, 'zenski', 15);

-- --------------------------------------------------------

--
-- Table structure for table `pregled`
--

CREATE TABLE `pregled` (
  `id` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `diagnoza` varchar(255) DEFAULT NULL,
  `stanje` varchar(255) DEFAULT NULL,
  `opombe` varchar(255) DEFAULT NULL,
  `perad_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pregled`
--

INSERT INTO `pregled` (`id`, `datum`, `diagnoza`, `stanje`, `opombe`, `perad_id`, `korisnik_id`) VALUES
(1, '2026-01-11', 'Zdrava', 'Dobro', '-', 1, 2),
(2, '2026-01-20', 'Prehlad', 'Stabilno', 'Zdravljenje', 2, 2),
(3, '2026-02-02', 'Zdrava', 'Dobro', '-', 3, 5),
(4, '2026-02-15', 'Kontrola', 'Odlično', '-', 4, 1),
(5, '2026-03-06', 'Cepljenje', 'Dobro', 'Uspešno', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `prodaja`
--

CREATE TABLE `prodaja` (
  `id` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `kolicina` int(11) DEFAULT NULL,
  `skupna_cena` decimal(10,2) DEFAULT NULL,
  `nacin_placila` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `proizvodnja_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prodaja`
--

INSERT INTO `prodaja` (`id`, `datum`, `kolicina`, `skupna_cena`, `nacin_placila`, `status`, `proizvodnja_id`, `korisnik_id`) VALUES
(1, '2026-01-16', 10, '120.00', 'Gotovina', 'Plačano', 2, 3),
(2, '2026-02-05', 15, '180.00', 'Kartica', 'Plačano', 3, 3),
(3, '2026-02-20', 5, '60.00', 'Gotovina', 'V obdelavi', 4, 4),
(4, '2026-03-08', 25, '300.00', 'Kartica', 'Plačano', 5, 3),
(5, '2026-03-10', 8, '96.00', 'Gotovina', 'Poslano', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `proizvodnja`
--

CREATE TABLE `proizvodnja` (
  `id` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `tip` enum('perad','jajca') DEFAULT NULL,
  `kolicina` int(11) DEFAULT NULL,
  `opombe` varchar(255) DEFAULT NULL,
  `perad_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `proizvodnja`
--

INSERT INTO `proizvodnja` (`id`, `datum`, `tip`, `kolicina`, `opombe`, `perad_id`, `korisnik_id`) VALUES
(1, '2026-01-10', 'jajca', 300, 'Prva serija', 1, 2),
(2, '2026-01-15', 'perad', 20, 'Prodaja', 2, 2),
(3, '2026-02-01', 'jajca', 250, 'OK', 3, 5),
(4, '2026-02-12', 'perad', 15, 'Nova', 4, 1),
(5, '2026-03-05', 'jajca', 400, 'Velika serija', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sertifikat`
--

CREATE TABLE `sertifikat` (
  `id` int(11) NOT NULL,
  `naziv` varchar(100) DEFAULT NULL,
  `datum_izdaje` date DEFAULT NULL,
  `datum_poteka` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `proizvodnja_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sertifikat`
--

INSERT INTO `sertifikat` (`id`, `naziv`, `datum_izdaje`, `datum_poteka`, `status`, `proizvodnja_id`) VALUES
(1, 'BIO-001', '2026-01-01', '2027-01-01', 'Aktiven', 1),
(2, 'BIO-002', '2026-01-15', '2027-01-15', 'Aktiven', 2),
(3, 'ISO-001', '2026-02-01', '2027-02-01', 'Aktiven', 3),
(4, 'EKO-001', '2026-02-10', '2027-02-10', 'Potekel', 4),
(5, 'HACCP', '2026-03-01', '2027-03-01', 'Aktiven', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hrana`
--
ALTER TABLE `hrana`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnik_id` (`korisnik_id`);

--
-- Indexes for table `hrana_perad`
--
ALTER TABLE `hrana_perad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hrana_id` (`hrana_id`),
  ADD KEY `perad_id` (`perad_id`);

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `perad`
--
ALTER TABLE `perad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pregled`
--
ALTER TABLE `pregled`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perad_id` (`perad_id`),
  ADD KEY `korisnik_id` (`korisnik_id`);

--
-- Indexes for table `prodaja`
--
ALTER TABLE `prodaja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodnja_id` (`proizvodnja_id`),
  ADD KEY `korisnik_id` (`korisnik_id`);

--
-- Indexes for table `proizvodnja`
--
ALTER TABLE `proizvodnja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perad_id` (`perad_id`),
  ADD KEY `korisnik_id` (`korisnik_id`);

--
-- Indexes for table `sertifikat`
--
ALTER TABLE `sertifikat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodnja_id` (`proizvodnja_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hrana`
--
ALTER TABLE `hrana`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hrana_perad`
--
ALTER TABLE `hrana_perad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `perad`
--
ALTER TABLE `perad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pregled`
--
ALTER TABLE `pregled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prodaja`
--
ALTER TABLE `prodaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `proizvodnja`
--
ALTER TABLE `proizvodnja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sertifikat`
--
ALTER TABLE `sertifikat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hrana`
--
ALTER TABLE `hrana`
  ADD CONSTRAINT `hrana_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`);

--
-- Constraints for table `hrana_perad`
--
ALTER TABLE `hrana_perad`
  ADD CONSTRAINT `hrana_perad_ibfk_1` FOREIGN KEY (`hrana_id`) REFERENCES `hrana` (`id`),
  ADD CONSTRAINT `hrana_perad_ibfk_2` FOREIGN KEY (`perad_id`) REFERENCES `perad` (`id`);

--
-- Constraints for table `pregled`
--
ALTER TABLE `pregled`
  ADD CONSTRAINT `pregled_ibfk_1` FOREIGN KEY (`perad_id`) REFERENCES `perad` (`id`),
  ADD CONSTRAINT `pregled_ibfk_2` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`);

--
-- Constraints for table `prodaja`
--
ALTER TABLE `prodaja`
  ADD CONSTRAINT `prodaja_ibfk_1` FOREIGN KEY (`proizvodnja_id`) REFERENCES `proizvodnja` (`id`),
  ADD CONSTRAINT `prodaja_ibfk_2` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`);

--
-- Constraints for table `proizvodnja`
--
ALTER TABLE `proizvodnja`
  ADD CONSTRAINT `proizvodnja_ibfk_1` FOREIGN KEY (`perad_id`) REFERENCES `perad` (`id`),
  ADD CONSTRAINT `proizvodnja_ibfk_2` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`);

--
-- Constraints for table `sertifikat`
--
ALTER TABLE `sertifikat`
  ADD CONSTRAINT `sertifikat_ibfk_1` FOREIGN KEY (`proizvodnja_id`) REFERENCES `proizvodnja` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
