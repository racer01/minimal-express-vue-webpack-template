const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const baseConfig = {
    entry: ['./server/src/index'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
    },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false, // fixes __dirname in node together with target: node
        __filename: false, // fixes __filename in node together with target: node
    },
};


//
// development configuration
//
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpackHotPoll = 'webpack/hot/poll?1000';
const devConfig = merge.smartStrategy({ externals: 'replace' })(baseConfig, {
    mode: 'development',
    entry: [webpackHotPoll], // include webpack hot reload to enable server-side hot reload
    externals: [
        nodeExternals({
            whitelist: [
                webpackHotPoll, // still bundle webpack polling to enable server-side hot reload
            ],
        }),
    ],
    optimization: {
        noEmitOnErrors: true, // don't bundle on error
    },
    plugins: [
        new CleanPlugin('dist', {
            beforeEmit: false,
        }),
        new FriendlyErrorsPlugin(),
        new StartServerPlugin('server.bundle.js'), // start server after bundling
        new webpack.HotModuleReplacementPlugin(), // enables server-side hot reload
    ],
    watch: true,
    stats: 'none',
});


//
// production configuration
//
const prodConfig = merge.smartStrategy()(baseConfig, {
    mode: 'production',
});

module.exports = (_, opts) => {
    switch (opts.mode) {
        case 'production':
            return prodConfig;
        default:
            return devConfig;
    }
};
