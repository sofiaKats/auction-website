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
DROP TABLE IF EXISTS auctionweb.users ;

CREATE TABLE IF NOT EXISTS auctionweb.users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255),
  first_name VARCHAR(255),
  last_name  VARCHAR(255),
  username  VARCHAR(255),
  password  VARCHAR(255),
  phone BIGINT,
  address  VARCHAR(255),
  geographical_location  VARCHAR(255),
  tax_identification_number BIGINT,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.role
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.roles ;

CREATE TABLE IF NOT EXISTS auctionweb.roles (
  id INT NOT NULL,
  name VARCHAR(255),
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.user_role
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.user_roles ;

CREATE TABLE IF NOT EXISTS auctionweb.user_roles (
  user_id BIGINT NOT NULL,
  role_id INT NOT NULL)
ENGINE = InnoDB;

  -- CREATE TABLE IF NOT EXISTS user (id INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname  VARCHAR(255) NOT NULL, username  VARCHAR(255) NOT NULL, password  VARCHAR(255) NOT NULL, phone INT NOT NULL, address  VARCHAR(255) NOT NULL, geographical_location  VARCHAR(255) NOT NULL, tax_identification_number  INT NOT NULL, user_code  INT NOT NULL, user_role  VARCHAR(255) NOT NULL, PRIMARY KEY (id)  )
