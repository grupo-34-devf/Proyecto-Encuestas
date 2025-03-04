import supertest from "supertest";
import api from "../api.js";

describe("Esto es un test", () => {
  test("/surveys", async () => {
    const response = await supertest(api).get("/surveys");

    expect(response.statusCode).toBe(200);
  });
});
