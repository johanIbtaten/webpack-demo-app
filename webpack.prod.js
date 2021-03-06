const path = require("path");
const glob = require("glob");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const { gzip } = require("zlib");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// On déclare un objet PATHS avec différents chemins
const PATHS = {
  src: path.join(__dirname, "src"),
  dist: path.join(__dirname, "dist"),
};

module.exports = merge(common, {
  mode: "production",
  output: {
    // Permet de générer un bundle js avec un hash pour le cache busting
    filename: "[name].[contentHash].bundle.js",
    path: PATHS.dist,
  },
  optimization: {
    /* 
      Si on configure minimizer on écrase la configuration par défaut
      il faut reconfigurer le plugin pour minimiser le js
    */
    minimizer: [
      // Permet de minifier le CSS
      new OptimizeCssAssetsPlugin(),
      // Permet de minifier le JS
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        // Permet de minifier le HTML
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    /* 
      Permet de configurer le nom du fichier css extrait
      avec un hash pour le cache busting
    */
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    // Permet de supprimer le dossier output avant de faire un nouveau build
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    // Crée un serveur avec une url (http://127.0.0.1:8888) où
    // l'on peut voir le poids des différents fichiers générés dans l'output
    new BundleAnalyzerPlugin({
      // La page du navigateur ne s'ouvre pas automatiquement après la compilation
      openAnalyzer: false,
      // On affiche les poids en gzippés
      defaultSizes: "gzip",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Permet d'extraire le css généré depuis le scss dans un fichier propre
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
