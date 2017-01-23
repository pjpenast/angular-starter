var path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);
var srcFolder = path.resolve(__dirname, '../src');
var distFolder = path.resolve(__dirname, '../dist');

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.root = root;
exports.isWebpackDevServer = isWebpackDevServer;
exports.srcFolder = srcFolder;
exports.distFolder = distFolder;
