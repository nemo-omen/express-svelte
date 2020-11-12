import { default as express } from 'express';
import { default as logger } from 'morgan';
import { default as bodyParser } from 'body-parser';
import { default as cookieParser } from 'cookie-parser';
import cors from 'cors';
import * as http from 'http';
import * as path from 'path';

import { approotdir } from './approot.js';
import { router as apiRouter } from './routes/api.js';

const __dirname = approotdir;

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

//api routes
api.use('/api', apiRouter);

app.listen(3000, () => {
    console.log("App listening at http://localhost:3000");
});

api.listen(3030, () => {
    console.log("API listening on http://localhost:3030");
});