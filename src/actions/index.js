import requireIndex from 'es6-requireindex';

let ctx;

try {
  ctx = require.context(__dirname, true, /^(.*\.((js|jsx)$))[^.]*$/igm);
} catch (err) {}

module.exports = requireIndex(ctx);
