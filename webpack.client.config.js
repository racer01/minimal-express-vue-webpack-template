const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: [
        './client/main.js',
        'webpack-hot-middleware/client',
    ],
    output: {
        path: path.resolve(__dirname, '.build'),
        filename: 'client.bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
