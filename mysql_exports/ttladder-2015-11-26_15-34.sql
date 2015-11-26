-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 26, 2015 at 03:33 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ttladder`
--

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE IF NOT EXISTS `challenges` (
  `challenge_id` int(11) NOT NULL AUTO_INCREMENT,
  `challenger_id` int(11) NOT NULL,
  `opponent_id` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`challenge_id`),
  UNIQUE KEY `idx_challenger_id` (`challenger_id`),
  UNIQUE KEY `idx_opponent_id` (`opponent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`challenge_id`, `challenger_id`, `opponent_id`, `time`) VALUES
(6, 2, 10, 0),
(7, 3, 14, 0),
(8, 18, 16, 0);

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE IF NOT EXISTS `matches` (
  `match_id` int(11) NOT NULL AUTO_INCREMENT,
  `challenger_id` int(11) NOT NULL,
  `opponent_id` int(11) NOT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`match_id`),
  KEY `challenger_id` (`challenger_id`),
  KEY `opponent_id` (`opponent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_id`, `challenger_id`, `opponent_id`, `time`) VALUES
(2, 7, 5, 0),
(3, 13, 1, 0),
(4, 1, 7, 0),
(5, 13, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `match_sets`
--

CREATE TABLE IF NOT EXISTS `match_sets` (
  `match_set_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_set_index` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `challenger_id` int(11) NOT NULL,
  `opponent_id` int(11) NOT NULL,
  `challenger_score` int(11) NOT NULL,
  `opponent_score` int(11) NOT NULL,
  PRIMARY KEY (`match_set_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `match_sets`
--

INSERT INTO `match_sets` (`match_set_id`, `match_set_index`, `match_id`, `challenger_id`, `opponent_id`, `challenger_score`, `opponent_score`) VALUES
(4, 1, 2, 7, 5, 18, 16),
(5, 0, 2, 7, 5, 8, 11),
(6, 2, 2, 7, 5, 8, 11),
(7, 3, 2, 7, 5, 11, 9),
(8, 4, 2, 7, 5, 11, 6),
(9, 0, 3, 13, 1, 6, 11),
(10, 1, 3, 13, 1, 8, 11),
(11, 2, 3, 13, 1, 11, 9),
(12, 3, 3, 13, 1, 6, 11),
(13, 0, 4, 1, 7, 11, 6),
(14, 1, 4, 1, 7, 11, 5),
(15, 2, 4, 1, 7, 11, 5),
(16, 0, 5, 13, 7, 7, 11),
(17, 1, 5, 13, 7, 11, 9),
(18, 2, 5, 13, 7, 11, 6),
(19, 3, 5, 13, 7, 12, 14),
(20, 4, 5, 13, 7, 11, 7);

-- --------------------------------------------------------

--
-- Table structure for table `position_changes`
--

CREATE TABLE IF NOT EXISTS `position_changes` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `from_ladder_position` int(11) NOT NULL,
  `to_ladder_position` int(11) NOT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `ladder_position` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `idx_user_id` (`user_id`),
  UNIQUE KEY `idx_email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `nickname`, `ladder_position`) VALUES
(1, 'mjn@cego.dk', 'Firecow', 1),
(2, 'ja@cego.dk', 'Kage Jens', 10),
(3, 'jp@cego.dk', 'Jens Paaske', 6),
(4, 'bn@cego.dk', 'Brian Nielsen', 12),
(5, 'mr@cego.dk', 'Mudderrosen', 2),
(6, 'kih@cego.dk', 'Kim', 7),
(7, 'kls@cego.dk', 'Klaus', 5),
(8, 'df@cego.dk', 'Friis', 11),
(10, 'ms@cego.dk', 'Mathias', 9),
(11, 'ah@cego.dk', 'Andy', 8),
(13, 'ok@cego.dk', 'Rocha', 3),
(14, 'fo@cego.dk', 'Svensken', 4),
(15, 'ml@cego.dk', 'Crenny', 13),
(16, 'mhl@cego.dk', 'Mikkel Larsen', 14),
(17, 'kb@cego.dk', 'Mr. Robinson', 15),
(18, 'pf@cego.dk', 'Peter F', 16),
(19, 'uo@cego.dk', 'Ulrik', 18),
(20, 'al@cego.dk', 'Anders Lauritsen', 17);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`challenger_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`opponent_id`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
