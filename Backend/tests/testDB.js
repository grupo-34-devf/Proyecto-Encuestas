import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo;

// Fn para conectarme a la base de memoria
const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: "testDB" });
};

// Fn para desconectarme
const disconnectDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo instanceof MongoMemoryServer) {
    await mongo.stop();
  }
};

// Fn para limpiar base entre tests
const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export { connectDB, disconnectDB, clearDB };
