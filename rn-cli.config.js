const blacklist = require("metro/src/blacklist");

module.exports = {
  getBlacklistRE: function() {
    return blacklist([new RegExp(/.*\/__fixtures__\/.*/)]); // Ignore the electron dist folder.
  }
};
