const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../dist/')));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
  })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))