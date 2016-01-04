import requireIndex from 'es6-requireindex';

let req;

try {
  req = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
} catch (err) {}

var c = requireIndex(req);
console.log(c);
module.exports = c;