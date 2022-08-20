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
