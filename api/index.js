import { default as express } from 'express';
import { default as logger } from 'morgan';
import { default as bodyParser } from 'body-parser';
import { default as cookieParser } from 'cookie-parser';
import cors from 'cors';
import * as http from 'http';
import * as path from 'path';

import { routes } from './routes/index.js';

export const app = express();

app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());

//set up app routes
Object.keys(routes).forEach((key) => {
    app.use(`/${key}`, routes[key]);
});