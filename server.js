import { default as express } from 'express';
import { default as logger } from 'morgan';
import { default as bodyParser } from 'body-parser';
import { default as cookieParser } from 'cookie-parser';
import cors from 'cors';
import * as http from 'http';
import * as path from 'path';

// basic config imports
import { staticPort, apiPort, __dirname } from './config.js';

import { router as apiRouter } from './routes/api.js';

//app for serving frontend
const app = express();

//api for , well, API requests
const api = express();

// TODO find a way to not repeat each of these
app.use(logger('dev'));
api.use(logger('dev'));
api.use(cors());
app.use(cors());


//use static for app
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

//we want that JSON data!
api.use(bodyParser.json());

//api routes can be found in /routes/api.js
api.use('/api', apiRouter);


//change port for serving static assets
app.listen(3000, () => {
    console.log(`App listening at http://localhost:${staticPort}`);
});


//change port here for api server
api.listen(3030, () => {
    console.log(`API listening on http://localhost:${apiPort}`);
});