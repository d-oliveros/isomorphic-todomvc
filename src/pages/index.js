import requireIndex from 'es6-requireindex';

let req;

try {
  req = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
} catch (err) {}

module.exports = requireIndex(req);
