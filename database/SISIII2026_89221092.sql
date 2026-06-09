-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 08, 2026 at 09:30 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `hrana_perad`
--

CREATE TABLE `hrana_perad` (
  `id` int(11) NOT NULL,
  `hrana_id` int(11) DEFAULT NULL,
  `perad_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `vloga` enum('delavec','dostavljalec','kupec','admin') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `perad_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  ADD KEY `perad_id` (`perad_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hrana_perad`
--
ALTER TABLE `hrana_perad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `perad`
--
ALTER TABLE `perad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pregled`
--
ALTER TABLE `pregled`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prodaja`
--
ALTER TABLE `prodaja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proizvodnja`
--
ALTER TABLE `proizvodnja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sertifikat`
--
ALTER TABLE `sertifikat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `pregled_ibfk_1` FOREIGN KEY (`perad_id`) REFERENCES `perad` (`id`);

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
