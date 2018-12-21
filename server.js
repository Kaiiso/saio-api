// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apirouter = require('./api-router').router;
const path = require('path');
const cors = require('cors');

// Instantiate server
const server = express();

// Body parser configuration
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Routes configuration
server.get('/', (req, res) => {
    res.status(200);
    res.end('Type request in url. ex: /api/...');
});

server.use(cors());

server.use('/api/', apirouter);

server.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
});

// Start server
server.listen(8082, () => {
    console.log('Server listening at port 8082');
});