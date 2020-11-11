import express from 'express';
import * as bodyParser from 'body-parser'
import { createOne, getAll, getOne, updateOne, deleteOne } from './services/graphics.service.js';

const app = express();

app.use('/', express.static('public'));

//we want that JSON data!
app.use(bodyParser.json());

//post graphics
app.post('/api/graphics', async (req, res) => {
    const graphic = req.body;
    console.log(graphic);
    const response = await createOne(graphic);
    console.log(response);
    return res.json(response);
})

//get graphics
app.get('/api/graphics', async (req, res) => {
    const graphics = await getAll();
    return res.json(graphics);
});

//get single graphic
app.get('/api/graphics/:id', async (req, res) => {
    const graphicId = req.params.id;
    const graphic = await getOne(graphicId);
    return res.json(graphic);
});

app.delete('/api/graphics/:id', async (req, res) => {
    const graphicId = req.params.id;
    const graphic = await deleteOne(graphicId);
    return res.json(graphic);
});

app.put('/api/graphics/', async (req, res) => {
    const updateGraphic = req.body;
    const graphic = await updateOne(updateGraphic);
    return res.json(graphic);
});

app.listen(3000, () => {
    console.log("App listening at http://localhost:3000");
});