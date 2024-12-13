const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/', 
                    publicPath: 'images/'  
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
      },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port:3009,

        historyApiFallback: true // This will serve index.html for all routes
    },
    plugins: [
      new HtmlWebpack({
         template: './public/index.html',
         inject: true,                            
         filename: 'index.html'
       }),
    ],
    mode: "development"
};


