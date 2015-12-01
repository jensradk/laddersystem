-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 01, 2015 at 09:54 AM
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
  `time` bigint(11) NOT NULL,
  PRIMARY KEY (`challenge_id`),
  UNIQUE KEY `idx_challenger_id` (`challenger_id`),
  UNIQUE KEY `idx_opponent_id` (`opponent_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`challenge_id`, `challenger_id`, `opponent_id`, `time`) VALUES
(8, 18, 16, 1448952608346),
(16, 10, 11, 1448952608346),
(17, 2, 6, 1448952608346),
(18, 20, 17, 1448952608346),
(19, 3, 5, 1448952608346),
(22, 23, 19, 1448956529464);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`match_id`, `challenger_id`, `opponent_id`, `time`) VALUES
(2, 7, 5, 1448952608346),
(3, 13, 1, 1448952608346),
(4, 1, 7, 1448952608346),
(5, 13, 7, 1448952608346),
(6, 3, 14, 1448952608346),
(7, 3, 7, 1448952608346),
(8, 13, 1, 1448952608346),
(9, 3, 1, 1448952608346),
(10, 1, 13, 1448952608346),
(11, 2, 10, 1448952608346),
(12, 14, 5, 1448952608346),
(13, 7, 3, 1448955123827),
(14, 14, 1, 1448958791850);

-- --------------------------------------------------------

--
-- Table structure for table `match_scores`
--

CREATE TABLE IF NOT EXISTS `match_scores` (
  `score_id` int(11) NOT NULL AUTO_INCREMENT,
  `match_id` int(11) NOT NULL,
  `match_set_index` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

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
(20, 4, 5, 13, 7, 11, 7),
(21, 0, 6, 3, 14, 11, 7),
(22, 1, 6, 3, 14, 11, 2),
(23, 2, 6, 3, 14, 5, 11),
(24, 3, 6, 3, 14, 8, 11),
(25, 4, 6, 3, 14, 12, 14),
(26, 0, 7, 3, 7, 11, 9),
(27, 1, 7, 3, 7, 11, 7),
(28, 2, 7, 3, 7, 11, 4),
(29, 0, 8, 13, 1, 9, 11),
(30, 1, 8, 13, 1, 11, 4),
(31, 2, 8, 13, 1, 11, 8),
(32, 4, 8, 13, 1, 11, 7),
(33, 3, 8, 13, 1, 9, 11),
(34, 0, 9, 3, 1, 6, 11),
(35, 1, 9, 3, 1, 8, 11),
(36, 2, 9, 3, 1, 6, 11),
(37, 1, 10, 1, 13, 11, 9),
(38, 2, 10, 1, 13, 11, 7),
(39, 0, 10, 1, 13, 11, 9),
(40, 0, 11, 2, 10, 12, 10),
(41, 1, 11, 2, 10, 11, 9),
(42, 2, 11, 2, 10, 11, 5),
(43, 0, 12, 14, 5, 11, 6),
(44, 1, 12, 14, 5, 11, 9),
(45, 2, 12, 14, 5, 11, 9),
(46, 0, 13, 7, 3, 4, 11),
(47, 1, 13, 7, 3, 7, 11),
(48, 2, 13, 7, 3, 11, 6),
(49, 3, 13, 7, 3, 11, 13),
(50, 1, 14, 14, 1, 8, 11),
(51, 2, 14, 14, 1, 4, 11),
(52, 3, 14, 14, 1, 4, 11),
(53, 0, 14, 14, 1, 11, 9);

-- --------------------------------------------------------

--
-- Table structure for table `position_changes`
--

CREATE TABLE IF NOT EXISTS `position_changes` (
  `position_change_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `from_ladder_position` int(11) NOT NULL,
  `to_ladder_position` int(11) NOT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`position_change_id`)
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `nickname`, `ladder_position`) VALUES
(1, 'mjn@cego.dk', 'Firecow', 1),
(2, 'ja@cego.dk', 'Kage Jens', 9),
(3, 'jp@cego.dk', 'Jens Paaske', 5),
(4, 'bn@cego.dk', 'Brian Nielsen', 12),
(5, 'mr@cego.dk', 'Mudderrosen', 4),
(6, 'kih@cego.dk', 'Kim', 7),
(7, 'kls@cego.dk', 'Klaus', 6),
(8, 'df@cego.dk', 'Friis', 11),
(10, 'ms@cego.dk', 'Mathias', 10),
(11, 'ah@cego.dk', 'Andy', 8),
(13, 'ok@cego.dk', 'Rocha', 3),
(14, 'fo@cego.dk', 'Svensken', 2),
(15, 'ml@cego.dk', 'Crenny', 13),
(16, 'mhl@cego.dk', 'Mikkel Larsen', 14),
(17, 'kb@cego.dk', 'Mr. Robinson', 15),
(18, 'pf@cego.dk', 'Peter F', 16),
(19, 'uo@cego.dk', 'Ulrik', 18),
(20, 'al@cego.dk', 'Anders Lauritsen', 17),
(21, 'ro@cego.dk', 'Rasmus', 19),
(22, 'kk@cego.dk', 'Kim Kristensen', 21),
(23, 'jwk@cego.dk', 'Johnny', 20),
(24, 'jgn@cego.dk', 'Johannes', 22),
(25, 'mjo@cego.dk', 'Mark', 23),
(26, 'jm@cego.dk', 'Jimmy', 24);

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
