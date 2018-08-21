import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

import webpack from 'webpack';
import webpackClientCfgFactory from '../webpack.client.config.js';
const webpackClientCfg = webpackClientCfgFactory(undefined, { mode: 'development' });
const clientCompiler = webpack(webpackClientCfg);
import webpackDevMiddleware from 'webpack-dev-middleware';
app.use(webpackDevMiddleware(clientCompiler, {
    logLevel: 'silent',
    publicPath: webpackClientCfg.output.publicPath,
}));
import webpackHotMiddleware from 'webpack-hot-middleware';
app.use(webpackHotMiddleware(clientCompiler, {
    log: false,
}));


app.get('/', function(req, res) {
    console.log(path.resolve(__dirname, 'index.html'));
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    res.send({
        message: 'I am a server route and can also be hot reloaded!'
    });
})


export default app;
