const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'ranking', 'listpage', 'search', 'about', 'articlepage'];

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, '../src/assets'),
        compress: true,
        port: 3001
    },
    entry: './src/js/main.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve('__dirname', '../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, 
                    { 
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, 
                    { 
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
    plugins: pages.map(page =>
        new HtmlWebpackPlugin({
            template: `src/views/${page}.pug`,
            filename: `${page}.html`,
            inject: 'body',
        }),
    )
};
