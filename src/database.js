require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);


const Scraping_results = sequelize.define('scraping_results', 
	{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		href: {
			type: Sequelize.STRING,
			allowNull: true
		},

		results: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}, {
		timestamps: false
	}
);



sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');

		exampleInsert();
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});


function exampleInsert() {
	const exampleOfResult = Scraping_results.build({
		href: 'this_is_an_example_record',
		results: 'this is an example record'
	});

	//Inserting Data into database
	exampleOfResult.save().
		then(() => {
			console.log('Data successfully inserted');
		}).catch(err => {
			console.error('Error in Inserting Record:', err);
		});

}