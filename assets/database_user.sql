-- Create user 'scraping_user' with password 'scraping_pass'. User only can use 'node-scraping-mysql' database on 'localhost'

GRANT SELECT, INSERT, UPDATE, DELETE ON `node-scraping-mysql`.* TO 'scraping_user'@'localhost' IDENTIFIED BY PASSWORD '*9ECC52FA55FB5F1E991B8E0A9433CB783E5428D0';