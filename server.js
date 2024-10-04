//import the dependencies
const express = require ('express')
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv') ;

//configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//test the connection
db.connect((error) => {
//connection not successful
if(error) {
  return console.log("Error connecting to the database: ", error)
}

//connection successful
console.log("Successfully connected to mysql: ", db.threadId)
});


//QUESTION 1 - retrieve all patients
app.get('', (req, res) => {
  db.query('SELECT * FROM patients', (err, data) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }
    res.status(200).send(data);
  });
});

//Question 2 - retrieve all providers
app.get('/providers', (req, res) => {
  db.query('SELECT * FROM providers', (err, data) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }
    res.status(200).send(data);
  });
});


//Question 3 - Filter patients by First Name
app.get('/patientsfirstname', (req, res) => {
  db.query('SELECT first_name FROM patients', (err, data) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }
    res.status(200).send(data);
  });
});


//Question 4 - Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
  const { specialty } = req.query;

  // Check if the specialty was provided
  if (!specialty) {
    return res.status(400).send('Specialty parameter is required');
  }

  // Query the database for providers with the specified specialty
  db.query('SELECT * FROM providers WHERE provider_specialty = ?', [specialty], (err, data) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }
    res.status(200).send(data);
  });
});











const PORT = 4000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
