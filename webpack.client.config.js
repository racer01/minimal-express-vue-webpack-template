const merge = require('webpack-merge');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const baseConfig = {
    entry: ['./client/src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'client.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
    },
    plugins: [
        new HtmlPlugin({
            template: 'index.html',
        }),
        new VueLoaderPlugin(),
    ],
};


//
// development configuration
//
const webpack = require('webpack');
const webpackHotMiddleware = 'webpack-hot-middleware/client';
const devConfig = merge.smart(baseConfig, {
    mode: 'development',
    entry: [webpackHotMiddleware],
    output: {
        publicPath: '/',
    },
    optimization: {
        noEmitOnErrors: true, // don't bundle on error
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});


//
// production configuration
//
const prodConfig = merge.smartStrategy()(baseConfig, {
    mode: 'production',
    output: {
        publicPath: '/',
    },
});

module.exports = (_, opts) => {
    switch (opts.mode) {
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
};
