// index.js
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fileName = 'commodities.json';
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let commodities = [];
// Set up the view engine to use Handlebars
app.set('view engine', 'hbs');
// Set the folder where your views (HBS files) are located
//app.set('views', __dirname + '/views');

// Set the folder where your static files (CSS and JS) are located
app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));
//app.use(express.static('public'));

// Endpoint for fetching all commodities
app.get('/commodities', (req, res) => {
  res.json(commodities);
});

// Endpoint for adding a new commodity
app.post('/commodities', (req, res) => {
  const { id, name } = req.body;
  commodities.push({ id, name });
  res.sendStatus(201); // Created
});

// Endpoint for updating a commodity by ID
app.put('/commodities/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = commodities.findIndex((commodity) => commodity.id === parseInt(id));

  if (index !== -1) {
    commodities[index].name = name;
    res.sendStatus(200); // OK
  } else {
    res.sendStatus(404); // Not Found
  }
});

// Endpoint for deleting a commodity by ID
app.delete('/commodities/:id', (req, res) => {
  const { id } = req.params;
  commodities = commodities.filter((commodity) => commodity.id !== parseInt(id));
  res.sendStatus(204); // No Content
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Your routes and other configurations go here...*/
// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.get('/', (request, response) => {
  response.render('home');
});

// This is a RESTful GET web service
app.get('/commodities', (request, response) => {
  data.sort((a, b) => (a.name > b.name) ? 1 : -1);
  response.send(data);
});

// This is a RESTful POST web service
app.post('/commodities', jsonParser, (request, response) => {
  data.push(request.body);
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  response.end();
});

// app.listen(port);
// console.log('server listening on port 3000');
