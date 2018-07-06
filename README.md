# node-scrapping-mysql
This is a Node.js application. This application scrap data from Wikipedia website and store it on a MySQL database.  

## How to use
* Download repo
* Install dependencies `npm install`
* You must have database server running (MySQL 5.7 or higher. If you prefer, you can use MariaDB 10.1 or higher)
* Execute `.sql` files that you will find in the `assets` folder
* You must configure the authentication data for MySQL.
  * Write your credentials in file `_env` or use provided examples data
  * Rename the file `_env` to `.env`
* Execute script with `node .` or `npm start`
* Every minute you got new data on bdd!

For run test: `npm run test:coverage`  

For run documentation: `npm run doc-view`  

