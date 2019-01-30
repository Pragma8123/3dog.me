require('dotenv').config();
const { join } = require('path');
const fs = require('fs');
const express = require('express');
const Bundler = require('parcel-bundler');
const compression = require('compression');

const app = express();
app.use(compression());

const bundler = new Bundler(join(__dirname, 'index.html'));
bundler.on('buildEnd', () => {
  // Copy threedog.png for Open Graph metadata
  fs.copyFileSync(
    join(__dirname, 'src/threedog.png'),
    join(__dirname, 'dist/threedog.png')
  );
});
app.use(bundler.middleware());

const port = process.env.PORT || 8080;
app.listen(port, err => {
  if (err) console.log(err);
});
