const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = ['index', 'ranking', 'listpage', 'search', 'about', 'articlepage'];

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, '../build')
    },
    module: {
        rules: [
            {
                test: /\.js$/g,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|otf)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  publicPath: '/images/'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        ...pages.map(page =>
            new HtmlWebpackPlugin({
              template: `src/views/${page}.pug`,
              filename: `${page}.html`,
              inject: 'body',
            }),
        ),
        new CopyWebpackPlugin(
          [
            {
              from: path.resolve(__dirname, '../src/assets/images'),
              to: path.resolve(__dirname, '../build/images/[name].[ext]'),
            }
          ]
        ),
    ]
};
