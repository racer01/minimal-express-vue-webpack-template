import http from 'http';
import app from './config/app';
import configClientHotMiddleware from './config/client-hot-reload.js';
if (process.env.NODE_ENV === 'development') {
    configClientHotMiddleware(app);
}

const server = http.createServer(app);
let currentApp = app;
server.listen(3000);

if (module.hot) {
    module.hot.accept('./config/app', () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}
