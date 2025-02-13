import mongoose from "mongoose";

mongoose.connection.on("open", () => {
  console.info("Database connected 💚");
});

mongoose.connection.on("disconnected", () => {
  console.warn("Database disconnected 💛");
});

export const connect = async () => {
  const { MONGO_URI } = process.env;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI undefined from .env file");
  }

  await mongoose.connect(MONGO_URI);
};
