const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.js/,
                include: /src/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                    
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',

        }),
        new HTMLWebpackPlugin({
            file: 'index.html',
            template: './public/index.html'
        })
    ],
    devServer: {
        port: 3000,
        open: true
    },
    devtool: 'inline-source-map' //解决调试问题 源码映射
}
    