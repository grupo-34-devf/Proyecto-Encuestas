import http from "http";
import api from "./api.js";
import { connect } from "./database.js";

const server = http.createServer(api);

server.on("listening", () => {
  console.info("Server listening on", 8081);
});

server.on("error", (error) => {
  console.error("Server error", error);
});

connect();
server.listen(8081);
