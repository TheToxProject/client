const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module = {
    ...storybookBaseConfig.module,
    rules: [
      ...storybookBaseConfig.module.rules,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      }
    ]
  };

  storybookBaseConfig.resolve = {
    modules: ["node_modules"],
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"],
    alias: {
      "react-native": "react-native-web"
    }
  };

  return storybookBaseConfig;
};
