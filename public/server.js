const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use("/**", function (req, res) {
  res.sendfile(path.resolve(__dirname, '/index.html', {maxAge: 0}));
});

app.listen(port, () => {
  console.info(`The server is running at http://localhost:${port}/`);
});
