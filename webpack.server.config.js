const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        'webpack/hot/poll?1000',
        './server/index'
    ],
    output: {
        path: path.resolve(__dirname, '.build'),
        filename: 'server.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ],
    },
    target: 'node',
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    plugins: [
        new StartServerPlugin('server.bundle.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server'),
            },
        }),
    ],
    watch: true,
    node: {
        __dirname: false, // fixes __dirname in node together with target: node
        __filename: false,
    },
};
