const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module = {
    ...storybookBaseConfig.module,
    rules: [
      ...storybookBaseConfig.module.rules,
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      },
      {
        test: /\.(js|jsx|mjs)$/,
        include: [
          /src\/*/,
          /node_modules\/react-native-/,
          /node_modules\/react-router*/
        ],
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          presets: [require.resolve("babel-preset-react-native")],
          // ,'babel-preset-stage-0' 'babel-preset-es2015' @remove-on-eject-end This is a
          // feature of `babel-loader` for webpack (not Babel itself). It enables caching
          // results in ./node_modules/.cache/babel-loader/ directory for faster rebuilds.
          cacheDirectory: false
        }
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
