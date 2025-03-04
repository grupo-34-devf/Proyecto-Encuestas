import mongoose from "mongoose";
import config from "./config.js";
import { MongoMemoryServer } from "mongodb-memory-server";

mongoose.connection.on("open", () => {
  console.info("Database connected 💚");
});

mongoose.connection.on("disconnected", () => {
  console.warn("Database disconnected 💛");
});

export const connect = async () => {
  const MONGO_URI = config.mongoURI;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI undefined from .env file");
  }

  if (process.env.NODE_ENV?.trim() == "test") {
    // Conectarse a base de mongodb memory server
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri, { dbName: "testDB" });
  } else {
    await mongoose.connect(MONGO_URI);
  }
};
