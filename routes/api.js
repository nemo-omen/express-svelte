import { default as express } from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../services/graphics.service.js';

export const router = express.Router();

//post graphics
router.post('/graphics', async (req, res) => {
    const graphic = req.body;
    console.log(graphic);
    const response = await createOne(graphic);
    console.log(response);
    return res.json(response);
});

//get graphics
router.get('/graphics', async (req, res) => {
    const graphics = await getAll();
    return res.json(graphics);
});

//get single graphic
router.get('/graphics/:id', async (req, res) => {
    const graphicId = req.params.id;
    const graphic = await getOne(graphicId);
    return res.json(graphic);
});

router.delete('/graphics/:id', async (req, res) => {
    const graphicId = req.params.id;
    const graphic = await deleteOne(graphicId);
    return res.json(graphic);
});

router.put('/graphics/', async (req, res) => {
    const updateGraphic = req.body;
    const graphic = await updateOne(updateGraphic);
    return res.json(graphic);
});