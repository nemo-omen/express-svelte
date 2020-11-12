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

const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

//we want that JSON data!
app.use(bodyParser.json());

//api routes
app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log("App listening at http://localhost:3000");
});