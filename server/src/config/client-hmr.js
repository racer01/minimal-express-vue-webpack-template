import webpack from 'webpack';
import webpackClientCfgFactory from '~/webpack.client.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default app => {
    const webpackClientCfg = webpackClientCfgFactory(undefined, { mode: 'development' });
    const clientCompiler = webpack(webpackClientCfg);
    app.use(webpackDevMiddleware(clientCompiler, {
        logLevel: 'silent', // disable log for FriendlyErrorsPlugin
        publicPath: webpackClientCfg.output.publicPath,
    }));
    app.use(webpackHotMiddleware(clientCompiler, {
        log: false, // disable log for FriendlyErrorsPlugin
    }));
};
