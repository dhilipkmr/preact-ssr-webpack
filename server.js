// import render from 'preact-render-to-string';
import { h } from 'preact';
import App from './client/App';

const express = require("express");
const path = require("path");

const appServer = express();
const port = 8080;

appServer.use(express.static(path.join(__dirname, "dist")));
appServer.use(express.static(path.join(__dirname, "static")));

appServer.listen(port, function() {
  console.log(`Server started at http://localhost:${port}`);
});

appServer.get("/", (req, res) => {
  // const html = render(<App/>);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Preact SSR</title>
        <link rel="stylesheet" href="./style.css">
      </head>
      <body>
        <script src="./app.js"></script>
      </body>
    </html>
  `);
});
