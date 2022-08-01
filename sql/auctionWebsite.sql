SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; 
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; 
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';
-- -----------------------------------------------------
-- Schema AuctionWeb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS auctionweb ;

-- -----------------------------------------------------
-- Schema AuctionWeb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS auctionweb DEFAULT CHARACTER SET utf8 ;
USE auctionweb ;

-- -----------------------------------------------------
-- Table AuctionWeb.user
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.user ;

CREATE TABLE IF NOT EXISTS auctionweb.user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  firstname VARCHAR(45) NOT NULL,
  lastname  VARCHAR(45) NOT NULL,
  username  VARCHAR(45) NOT NULL,
  password  VARCHAR(45) NOT NULL,
  phone INT NOT NULL,
  address  VARCHAR(45) NOT NULL,
  geographical_location  VARCHAR(45) NOT NULL,
  tax_identification_number  VARCHAR(45) NOT NULL,
  user_role  VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
  )
