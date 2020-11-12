import mongoist from 'mongoist';

import { dbUrl, dbName, collectionName } from '../config.js';

const db = mongoist(`${dbUrl}/${dbName}`);

// TODO do some error checking in here, jeez!

// create a document
export async function createOne(newDocument) {
  const document = await db[collectionName].save(newDocument);
  return document;
}

export async function getAll() {
  const documents = await db[collectionName].find();
  return documents;
}

export async function getOne(documentId) {
  const document = await db[collectionName].findOne({ _id: mongoist.ObjectId(documentId)});
  console.log("\n\ndb document: ", document);
  return document;
}

export async function updateOne(updateDocument) {
  const { _id, ...replacementDocument } = updateDocument;
  const updateResponse = await db[collectionName].replaceOne({_id: mongoist.ObjectId(_id)}, replacementDocument);
  return updateResponse;
}

export async function deleteOne(documentId) {
  const document = db[collectionName].findOne({ _id: mongoist.ObjectId(documentId) });
  if (document === null) {
    return { ok: false, status: "Document not found" };
  }
  const deleteResponse = await db[collectionName].remove({ _id: mongoist.ObjectId(documentId) }, {justOne: true});
  if (deleteResponse.deletedCount !== 1) {
    return {ok: false, error: deleteResponse.errmsg}
  }
  return {ok: true, status: "deleted", _id: documentId};
}

// db events
db.on('error', (error) => {
  console.log(`\n\nThere was an error with the database: ${error}\n\n`);
});

db.on('connect', (whatever) => {
  console.log(`\nDb successfully connected.\n`);
});