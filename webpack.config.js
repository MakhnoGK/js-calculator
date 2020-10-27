const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },

  plugins: [new HtmlWebpackPlugin({template: './src/index.html'})],

  module: {
    rules: [
      /*
       * For using with just CSS
       * */
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      /*
       * And for use with SASS pre-processor (optionally)
       * */
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      /*
       * Loading image files in specific directories
       */
      {
        test: /\.(png|gif|svg|jpe?g)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
          outputPath: 'images',
        },
      },

      /* Font loading */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },

      {
        test: /\.(html)$/i,
        use: ['html-loader'],
      },
    ],
  },

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
