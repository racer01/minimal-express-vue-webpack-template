import path from 'path';
import express from 'express';

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

import configClientHotMiddleware from './client-hot-reload.js';
configClientHotMiddleware(app);

app.get('/', function (req, res) {
    console.log(path.resolve(__dirname, 'index.html'));
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/api', (req, res) => {
    res.send({
        message: 'I am a server route and can also be hot reloaded!',
    });
});


export default app;
