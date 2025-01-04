const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point for your application
  output: {
    filename: 'bundle.js',   // Output filename for the bundled file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply this rule to all .js files
        exclude: /node_modules/,
        use: 'babel-loader',  // Use Babel loader for JavaScript files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],  // Resolve these extensions automatically
  },
};
