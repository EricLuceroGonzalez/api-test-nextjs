import { MongoClient } from "mongodb";
// Function to make db connection
export async function connectDatabase() {
  // Connection to mongo:
  const clientDB = await MongoClient.connect(
    `mongodb+srv://${process.env.databaseName}:${process.env.databasePass}@cluster0.j4waz.mongodb.net/eventsUdemy?retryWrites=true&w=majority`
  );
  return clientDB;
};

export async function insertDocument (client, collection, document) {
  const db = client.db();
  // Get the Newsletter collection inside "events" db:
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  const documents = db.collection(collection).find().sort(sort).toArray();
  return documents;
};
