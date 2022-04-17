const arangojs = require("arangojs");

const db = new arangojs.Database({
  url: process.env.ARANGO_DB_URL || "http://localhost:8529/",
  databaseName: "bookworm",
  auth: { username: "root", password: "password" },
});

const getConnection = () => {
  getCollection("authors");
  getCollection("books");
  getEdgeCollection("writtenBy", arangojs.CollectionType.EDGE_COLLECTION);
  return db;
};

const getCollection = async (collectionName) => {
  const collections = await db.collections();

  if (collections.find((collection) => collection.name === collectionName)) {
    return await db.collection(collectionName);
  } else {
    return db.createCollection(collectionName);
  }
};

const getEdgeCollection = async (collectionName, collectionType) => {
  const collections = await db.collections();

  if (collections.find((collection) => collection.name === collectionName)) {
    return db.collection(collectionName);
  } else {
    return db.createCollection(collectionName, { type: collectionType });
  }
};

module.exports.getConnection = getConnection;
module.exports.getCollection = getCollection;
