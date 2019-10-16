import render from 'preact-render-to-string';
import { h } from 'preact';
import App from './client/App';

const express = require("express");
const path = require("path");


const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "dist")));

app.listen(port);

const vdom = <div>Hello Preact</div>
app.get("*", (req, res) => {
  const html = render(<App/>);
  console.log(html);

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Preact SSR</title>
</head>
<body>
  <div>Hi</div>
  ${html}
  <script src="./app.js"></script>
</body>
</html>
    `);
});

console.log(`Server started at http://localhost:${port}`);