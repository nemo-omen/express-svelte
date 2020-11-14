import { app as api }from './api/index.js';
import { app as staticApp } from './static/index.js';
import { wss } from './sockets/index.js';
import { socketPort, staticPort, apiPort } from './config.js';

console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++");

//static server => this is for the frontend!
staticApp.listen(staticPort, () => {
    console.log(`Static server listening at http://localhost:${staticPort}\n`);
});

//api server => yep, this is the api
api.listen(apiPort, () => {
    console.log(`API server listening at http://localhost:${apiPort}\n`);
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++\n");
});

//socket server located at /sockets/index.js

