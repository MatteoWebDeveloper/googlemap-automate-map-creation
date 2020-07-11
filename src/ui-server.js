const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const distFolder = path.resolve(__dirname, '../dist/');

app.use(express.static(distFolder));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})



app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`)) 