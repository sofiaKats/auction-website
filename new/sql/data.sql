-- admin password: letmein user password:letuserin
-- source C:\Users\sofia\Desktop\auction-website\new\sql\auctionWebsite.sql
INSERT INTO roles (id, name) VALUES (1 , 'ROLE_USER'); 
INSERT INTO roles (id, name) VALUES (2 , 'ROLE_ADMIN'); 
INSERT INTO users (id , email, first_name, last_name, username, password, phone, address, geographical_location, tax_identification_number, admin_accepted) VALUES (1,'ozzyosbourne@gmail.com', 'ozzy', 'osbourne', '@ozzyosbourne', '$2a$10$JxK1WXYzMV.IoY4UhlJ7KuxzVG75z7VN12CylUxLMnCNeBrcJExba', '698346683', '58 hollywood blvd', 'Los Angeles CA','21325535', true );
INSERT INTO user_roles (user_id, role_id) VALUES (1 , 2);
INSERT INTO users (id , email, first_name, last_name, username, password, phone, address, geographical_location, tax_identification_number, admin_accepted) VALUES (2,'madelinependleton@gmail.com', 'madeline', 'pendleton', '@madelinependleton', '$2a$10$DAAuwrPD/aCsUpRUy/t80eukONp/HKAQLloJp7orl7hzFqL8X.14K', '23456543', '4507 Brunswick Avenue', 'Los Angeles CA 90039','2345676', false );
INSERT INTO user_roles (user_id, role_id) VALUES (2 , 1);
INSERT INTO users (id , email, first_name, last_name, username, password, phone, address, geographical_location, tax_identification_number, admin_accepted) VALUES (3,'noahcarlos@gmail.com', 'noah', 'carlos', '@lsrthrift', '$2a$10$DAAuwrPD/aCsUpRUy/t80eukONp/HKAQLloJp7orl7hzFqL8X.14K', '233475643', 'Orange County', 'Los Angeles CA','2345746', false );
INSERT INTO user_roles (user_id, role_id) VALUES (3 , 1);
INSERT INTO users (id , email, first_name, last_name, username, password, phone, address, geographical_location, tax_identification_number, admin_accepted) VALUES (4,'annacoleman@gmail.com', 'Anna', 'Coleman', '@annacoleman', '$2a$10$DAAuwrPD/aCsUpRUy/t80eukONp/HKAQLloJp7orl7hzFqL8X.14K', '23987655', '732 Chapala Drive', 'Los Angeles CA','223464', false );
INSERT INTO user_roles (user_id, role_id) VALUES (4 , 1);
INSERT INTO item (id, user_id, buy_price, country, currently, description, first_bid, name, number_of_bids, started, ends, longitude, latitude, categories, location, is_active, has_bids) VALUES (1, 1, 20.78, 'USA', 0.01, 'im a Teenage Frankenstein', 0.01,'Alice Cooper Constictor Pic Picture Disc LP Teenage Frankenstein He’s Back 12”', 0, null, null, null, null, 'album, music, alice cooper', 'Los Angeles CA', false, false);
INSERT INTO category (item_id, category) VALUES (1, 'album');
INSERT INTO category (item_id, category) VALUES (1, 'music');
INSERT INTO category (item_id, category) VALUES (1, 'alice cooper');
INSERT INTO item (id, user_id, buy_price, country, currently, description, first_bid, name, number_of_bids, started, ends, longitude, latitude, categories, location, is_active, has_bids) VALUES (2, 2, null, 'USA', 0.01, 'Ivory rie top with empire waist, high slits, and lace trim!', 0.01,'Babydoll Lingerie Top', 0, null, null, '30 W 20 E', '50 N 80 S', 'babydoll, dress, vintage, shop tunnel vision', 'Los Angeles CA', false, false);
INSERT INTO category (item_id, category) VALUES (2, 'babydoll');
INSERT INTO category (item_id, category) VALUES (2, 'vintage');
INSERT INTO category (item_id, category) VALUES (2, 'shop tunnel vision');
INSERT INTO category (item_id, category) VALUES (2, 'dress');
INSERT INTO item (id, user_id, buy_price, country, currently, description, first_bid, name, number_of_bids, started, ends, longitude, latitude, categories, location, is_active, has_bids) VALUES (3, 1, 134.67, 'USA', 0.01, 'VINTAGE BARBIE DOLL 1961 #5 FIRST TITIAN REDHEADS MADE.', 0.01,'Vintage Barbie Doll First Issue Titian Ponytail', 0, null, null, '98 W 48 E', '79 N 68 S', 'barbie, vintage, dolls', 'Los Angeles CA', false, false);
INSERT INTO category (item_id, category) VALUES (3, 'vintage');
INSERT INTO category (item_id, category) VALUES (3, 'barbie');
INSERT INTO category (item_id, category) VALUES (3, 'dolls');
