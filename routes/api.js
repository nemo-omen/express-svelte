import { default as express } from 'express';
import { collectionName } from '../config.js';
//CRUD methods are all defined in the service file
import { createOne, getAll, getOne, updateOne, deleteOne } from '../services/test.service.js';

export const router = express.Router();

const baseUrl = collectionName;

//all routes below are yours for the changing!

//post document
router.post(`/${baseUrl}`, async (req, res) => {
    console.log(`\n\nPost request received for /${baseUrl}\n\n`);
    const document = req.body;
    const response = await createOne(document);
    return res.json(response);
});

//get all documents
router.get(`/${baseUrl}`, async (req, res) => {
    console.log(`\n\nGet request received for /${baseUrl}\n\n`);
    const documents = await getAll();
    return res.json(documents);
});

//get single document
router.get(`/${baseUrl}/:id`, async (req, res) => {
    const documentId = req.params.id;
    const document = await getOne(documentId);
    return res.json(document);
});

// delete document
router.delete(`/${baseUrl}/:id`, async (req, res) => {
    const documentId = req.params.id;
    const document = await deleteOne(documentId);
    return res.json(document);
});

//update a document
router.put(`/${baseUrl}`, async (req, res) => {
    const updateDocument = req.body;
    const document = await updateOne(updateDocument);
    return res.json(document);
});