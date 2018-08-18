import path from 'path';
import express from 'express';


const app = express();

app.use(express.static(path.resolve(__dirname, '.build', 'client')));

import webpack from 'webpack';
import webpackClientCfg from '../webpack.client.config.js';
const clientCompiler = webpack(webpackClientCfg);
import webpackDevMiddleware from 'webpack-dev-middleware';
app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientCfg.output.publicPath,
}));
import webpackHotMiddleware from 'webpack-hot-middleware';
app.use(webpackHotMiddleware(clientCompiler));


app.get('/', function(req, res) {
    console.log(path.resolve(__dirname, 'index.html'));
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    res.send({
        message: 'ASDI am a server route and can also be hot reloaded!'
    });
})


export default app;