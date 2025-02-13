import http from "http";
import api from "./api.js";

const server = http.createServer(api);

server.on("listening", () => {
  console.log("Server listening on", 8080);
});

server.on("error", (error) => {
  console.error("Server error", error);
});

server.listen(8080);
