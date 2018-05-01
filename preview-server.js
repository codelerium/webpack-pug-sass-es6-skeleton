const express = require('express');
const path = require('path');
const app = express();

// puplic
app.use(express.static('build'));

// routes
app.get('/', (req, res) => res.sendFile('index.html', { root: path.resolve(__dirname, 'build') }));
app.get('/about', (req, res) => res.sendFile('about.html', { root: path.resolve(__dirname, 'build') }));
app.get('/888', (req, res) => res.sendFile('listpage.html', { root: path.resolve(__dirname, 'build') }));
app.get('/article', (req, res) => res.sendFile('articlepage.html', { root: path.resolve(__dirname, 'build') }));
app.get('/ranking', (req, res) => res.sendFile('ranking.html', { root: path.resolve(__dirname, 'build') }));
app.get('/search', (req, res) => res.sendFile('search.html', { root: path.resolve(__dirname, 'build') }));

// start
app.listen(8080, () => console.log('Example app listening on port 8080!'));