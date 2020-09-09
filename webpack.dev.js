const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// On merge la common config avec la config
module.exports = merge(common, {
  mode: "development",
  output: {
    // On génère un output avec le nom de l'entry
    filename: "[name].bundle.js",
    // On créer un dossier d'output dist
    path: path.resolve(__dirname, "dist"),
  },
  // Les plugins sont des outils qui ajoute des fonctionnalités de bundle
  plugins: [
    /* 
      Ce plugin permet d'utiliser un template pour l'index.html et
      y injecter les bundles js et les styles css avec des hash
    */
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        // On teste avec une regex les fichiers qui finissent par .scss
        test: /\.scss$/,
        /* 
          Si on trouve un fichier .scss on utilise les loaders
          dans l'ordre inverse d'apparition
        */
        use: [
          "style-loader", //3. Inject styles into DOM via html <style></style> tag
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
