#! /usr/bin/env node
const fs = require('fs-extra');

const stylesDir = 'src/sass';
const stylesDestDir = 'assets';

fs.copy(stylesDir, stylesDestDir, function (err) {
  if (err) return console.error(err);
});
