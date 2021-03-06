import { default as express } from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne } from '../../services/test.service.js';
import { generateSocketResponse } from '../../helpers/socketresponse.js';
import { wss } from '../../sockets/index.js';
import { socketPort } from '../../config.js';

export const router = express.Router();

//all routes below are yours for the changing!

//post document
router.post(`/test`, async (req, res) => {
    console.log(`\n\nPost request received for /test}\n\n`);
    const document = req.body;
    const response = await createOne(document);
    return res.json(response);
});

//get all documents
router.get(`/test`, async (req, res) => {
    console.log(`\n\nGet request received for /test}\n\n`);
    const documents = await getAll();
    return res.json(documents);
});

//get single document
router.get(`/test/:id`, async (req, res) => {
    const documentId = req.params.id;
    const document = await getOne(documentId);
    return res.json(document);
});

// delete document
router.delete(`/test/:id`, async (req, res) => {
    const documentId = req.params.id;
    const document = await deleteOne(documentId);
    return res.json(document);
});

//update a document
router.put(`/test`, async (req, res) => {
    const updateDocument = req.body;
    const document = await updateOne(updateDocument);
    return res.json(document);
});