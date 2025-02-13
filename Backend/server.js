import http from "http";
import api from "./api.js";
import dotenv from "dotenv";
import { connect } from "./database.js";

dotenv.config();

const server = http.createServer(api);

server.on("listening", () => {
  console.info("Server listening on", 8080);
});

server.on("error", (error) => {
  console.error("Server error", error);
});

connect();
server.listen(8080);
