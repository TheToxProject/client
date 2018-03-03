const blacklist = require("metro/src/blacklist");

module.exports = {
  getBlacklistRE: function() {
    return blacklist([/dist\/.*/]); // Ignore the electron dist folder.
  }
};
