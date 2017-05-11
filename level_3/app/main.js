const express = require('express');
const fs = require('fs');
const app = express();

// This serves static files from the specified directory
app.use(express.static('static'));

// Disable the reflected XSS filter for demonstration purposes
app.use(function(req, res, next) {
  res.header('X-XSS-Protection', '0');
  next();
});

app.get(['/', '/index.html'], function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
