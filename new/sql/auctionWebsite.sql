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
  admin_accepted bit(1) NOT NULL,
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
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.seller
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.seller ;

CREATE TABLE IF NOT EXISTS auctionweb.seller (
  id BIGINT NOT NULL,
  rating float,
  user_id BIGINT, INDEX(user_id), -- this is MUL Key
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.bidder
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.bidder ;

CREATE TABLE IF NOT EXISTS auctionweb.bidder (
  id BIGINT NOT NULL,
  country VARCHAR(255),
  location VARCHAR(255),
  rating float,
  user_id BIGINT, INDEX(user_id), -- this is MUL Key
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.users_items
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS auctionweb.users_items ;

-- CREATE TABLE IF NOT EXISTS auctionweb.users_items (
--   user_id BIGINT NOT NULL, INDEX(user_id), -- this is MUL Key
--   items_id BIGINT NOT NULL,
--   PRIMARY KEY (items_id))
-- ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.item
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.item ;

CREATE TABLE IF NOT EXISTS auctionweb.item (
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_id BIGINT,
  buy_price double,
  country VARCHAR(255),
  currently double,
  description VARCHAR(255),
  ends datetime,
  first_bid double,
  name VARCHAR(255),
  number_of_bids INT,
  started datetime,
  longitude VARCHAR(255),
  latitude VARCHAR(255),
  categories VARCHAR(255),
  location VARCHAR(255),
  is_active bit(1),
  has_bids bit(1),
  has_images bit(1),
  bought_flag bit(1),
  -- user_id BIGINT, INDEX(user_id), -- this is MUL Key
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.category
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.category ;

CREATE TABLE IF NOT EXISTS auctionweb.category (
  item_id BIGINT NOT NULL, INDEX(item_id), -- this is MUL Key
  category VARCHAR(255)) 
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.bid
-- -----------------------------------------------------
DROP TABLE IF EXISTS auctionweb.bid ;

CREATE TABLE IF NOT EXISTS auctionweb.bid (
  id BIGINT NOT NULL AUTO_INCREMENT,
  amount double,
  time datetime,
  item_id BIGINT,
  user_id BIGINT,
  username VARCHAR(255),
  -- bidder_id BIGINT, INDEX(bidder_id), -- this is MUL Key
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table AuctionWeb.item_bids
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS auctionweb.item_bids ;

-- CREATE TABLE IF NOT EXISTS auctionweb.item_bids (
--   bids_id BIGINT NOT NULL,
--   item_id BIGINT NOT NULL, INDEX(item_id), -- this is MUL Key
--   PRIMARY KEY (bids_id)) 
-- ENGINE = InnoDB;
