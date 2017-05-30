const express = require('express');
const bleach = require('bleach');
const app = express();

const pageHeader = `<!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="/styles.css"/>
    </head>
    <body class="level1">
      <h1>Searchy McSearchface</h1>
      <div>`;

const pageBody = `<form action="search" method="GET">
  <input class="search" id="search" name="search" value="Enter query here"
    onfocus="this.value=''">
  <input class="button" type="submit" value="Search!">
</form>`;

const pageFooter = `</div>
  <p>The <em>safe</em> search engine</p>
  </body>
</html>`;

// This serves static files from the specified directory
app.use(express.static(__dirname + '/static'));

// Disable the reflected XSS filter for demonstration purposes
app.use(function(req, res, next) {
  res.header('X-XSS-Protection', '0');
  next();
});

app.get('/', (req, res) => {
  res.send(pageHeader + pageBody + pageFooter);
});

app.get('/search', (req, res) => {
  let userInput = req.query.search;
  if (userInput) {
    let message = 'Sorry, no results were found for <strong>' +
                  bleach.sanitize(userInput) +
                  '</strong>.';
    res.send(pageHeader + message + pageFooter);
  } else {
    res.send(pageHeader + pageBody + pageFooter);
  }
});

const server = app.listen(8081, function() {

  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
