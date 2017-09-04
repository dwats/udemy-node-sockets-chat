const path = require('path');
const express = require('express');

require('./config/config');

const publicPath = path.join(`${__dirname}/../public`);
const app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
