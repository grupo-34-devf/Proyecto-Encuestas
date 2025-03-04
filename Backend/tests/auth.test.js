import supertest from "supertest";
import api from "../api.js";
import { connectDB, disconnectDB, clearDB } from "./testDB.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disconnectDB();
});

// beforeEach(() => {
//   console.log("🟢");
// });

afterEach(async () => {
  await clearDB();
});

describe("Auth Routes", () => {
  test("/auth/register Registro completo", async () => {
    // Registrar un usuario llamando con un POST /auth/register
    // Verificar que regrese un 201 y el código NewUser

    const response = await supertest(api).post("/auth/register").send({
      firstName: "FirstName Test",
      lastName: "LastName Test",
      birthday: "2001-03-18",
      email: "test@test.com",
      password: "123123",
      gender: "Test",
    });

    expect(response.status).toBe(201);
    expect(response.body.code).toBe("NewUser");
  });
  test("/auth/register Registro incompleto", async () => {
    //     // Registrar un usuario a medias llamando con un POST /auth/register
    //     // Verificar que regrese un 500

    const response = await supertest(api).post("/auth/register").send({
      birthday: "2001-03-18",
      password: "123123",
      gender: "Test",
    });

    expect(response.status).toBe(500);
  });
  test("/auth/register Registro duplicado", async () => {
    // Crear un nuevo usuario
    // Registrar el mismo usuario que ya existia llamando con un POST /auth/register
    // Verificar que regrese un 409

    const response = await supertest(api).post("/auth/register").send({
      firstName: "FirstName Test",
      lastName: "LastName Test",
      birthday: "2001-03-18",
      email: "test@test.com",
      password: "123123",
      gender: "Test",
    });

    expect(response.status).toBe(201);
    expect(response.body.code).toBe("NewUser");

    const response2 = await supertest(api).post("/auth/register").send({
      firstName: "FirstName Test",
      lastName: "LastName Test",
      birthday: "2001-03-18",
      email: "test@test.com",
      password: "123123",
      gender: "Test",
    });

    expect(response2.status).toBe(409);
    expect(response2.body.code).toBe("DuplicatedUser");
  });
});
