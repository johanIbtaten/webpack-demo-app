module.exports = {
  /* 
    On définit les entrées qui vont être gérées par Webpack
    Ici deux entrées une pour notre application
    l'autre pour les librairies 
    ce qui générera deux bundles js dans le html
    Par défaut c'est ./src/index.js
  */
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  /* 
    Permet de chercher les fichiers (modules) de différentes extensions
    et d'utiliser des loaders pour les transformer avant de les ajouter au bundle js
  */
  module: {
    rules: [
      {
        // On teste avec une regex les fichiers qui finissent par .html
        test: /\.html$/,
        /* 
          Si on trouve un fichier .html on utilise le loader html-loader
          qui va ajouter le html et require les images au bundle js
          qui va lui même l'injecter dans le DOM
        */
        use: ["html-loader"],
      },
      {
        // On teste avec une regex les fichiers images
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          /* 
            Si on trouve un fichier image on utilise le loader file-loader
            qui va générer un fichier image dans le dossier output
            avec le bon chemin et un hash dans le nom de l'image
            pour le cache busting (création d'un nouveau fichier avec un nouveau nom
            pour chaque modification)
          */
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            // On place les images dans le output dans un dossier imgs
            outputPath: "imgs",
          },
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
