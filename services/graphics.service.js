import mongoist from 'mongoist';

const db = mongoist('mongodb://mongo/mando');

// TODO do some error checking in here, jeez!

export async function createOne(newGraphic) {
  const graphic = await db.graphics.save(newGraphic);
  return graphic;
}

export async function getAll() {
  const graphics = await db.graphics.find();
  return graphics;
}

export async function getOne(graphicId) {
  const graphic = await db.graphics.findOne({ _id: mongoist.ObjectId(graphicId)});
  console.log("\n\ndb Graphic: ", graphic);
  return graphic;
}

export async function updateOne(updateGraphic) {
  const { _id, ...replacementGraphic } = updateGraphic;
  const updateResponse = await db.graphics.replaceOne({_id: mongoist.ObjectId(_id)}, replacementGraphic);
  return updateResponse;
}

export async function deleteOne(graphicId) {
  const graphic = db.graphics.findOne({ _id: mongoist.ObjectId(graphicId) });
  if (graphic === null) {
    return { ok: false, status: "Graphic not found" };
  }
  const deleteResponse = await db.graphics.remove({ _id: mongoist.ObjectId(graphicId) }, {justOne: true});
  if (deleteResponse.deletedCount !== 1) {
    return {ok: false, error: deleteResponse.errmsg}
  }
  return {ok: true, status: "deleted", _id: graphicId};
}

// db events
db.on('error', (error) => {
  console.log(`\n\nThere was an error with the database: ${error}\n\n`);
});

db.on('connect', (whatever) => {
  console.log(`\n\nDb successfully connected, which returned: ${whatever}\n\n`);
});