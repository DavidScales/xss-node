const express = require('express');
const fs = require('fs');
const app = express();

// This serves static files from the specified directory
app.use(express.static(__dirname + '/static'));

// Disable the reflected XSS filter for demonstration purposes
app.use(function(req, res, next) {
  res.header('X-XSS-Protection', '0');
  next();
});

app.get(['/', '/index.html'], function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(8081, function() {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
