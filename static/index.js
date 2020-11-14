import { default as express } from 'express';
import { default as logger } from 'morgan';
import * as http from 'http';
import * as path from 'path';

export const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});