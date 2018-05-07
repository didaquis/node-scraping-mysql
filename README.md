# node-scrapping-mysql

This is a Node.js application. This application scrap data of a Wikipedia website and store it on a MySQL database.  

## How to use

* Download repo
* Install dependencies `npm install`
* You must have database server running (MySQL 5.7 or higher. If you prefer, you can use MariaDB 10.1 or higher)
* Execute `.sql` files that you will find in the `assets` folder
* You must configure the authentication data for MySQL.
  * Write your credentials in file `_env` or use provided examples data
  * Rename the file `_env` to `.env`
* Execute script with `node .` or `npm start`

For run test: `npm run test:coverage`

## Suggestion

You can deploy this code as a Node.js app on [Heroku](https://www.heroku.com/home)
