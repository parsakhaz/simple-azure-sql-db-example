// Import necessary modules
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

// Create an express application
const app = express();

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Configure database connection.
const config = {
	user: 'myAdmin',
	password: 'PasswordPassword123!',
	server: 'parsaserver2.database.windows.net',
	database: 'mySqlDb',
	options: {
		encrypt: true, // for azure
		trustServerCertificate: true, // change to true for local dev / self-signed certs
	},
};

// Connect to SQL Server
sql.connect(config).catch((err) => console.error(err));

// Endpoint to create a new document
app.post('/saveData', (req, res) => {
	const { title, content } = req.body;

	new sql.Request()
		.input('title', sql.NVarChar, title)
		.input('content', sql.Text, content)
		.query('INSERT INTO DOCUMENT (title, content) VALUES (@title, @content);')
		.then(() => res.sendStatus(200))
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

// Endpoint to update an existing document
app.post('/editData', (req, res) => {
	const { id, title, content } = req.body;

	new sql.Request()
		.input('id', sql.Int, id)
		.input('title', sql.NVarChar, title)
		.input('content', sql.Text, content)
		.query('UPDATE DOCUMENT SET title = @title, content = @content WHERE id = @id;')
		.then(() => res.sendStatus(200))
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

// Endpoint to delete an existing document
app.post('/deleteData', (req, res) => {
	const { id } = req.body;

	new sql.Request()
		.input('id', sql.Int, id)
		.query('DELETE FROM DOCUMENT WHERE id = @id;')
		.then(() => res.sendStatus(200))
		.catch((err) => {
			console.error(err);
			res.sendStatus(500);
		});
});

// Start the server
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
