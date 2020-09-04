import request from "supertest";
import app from "../config/server";

describe("Authentication", () => {
  it("Should create a new user if data is OK", (done) => {
    const user = {
      name: "Cadu Gomes",
      email: "caduvitorinog@gmail.com",
      password: "123123",
    };
    request(app).post("/register").send(user).expect(200, done);
  });

  it("Should signin if login data is OK", (done) => {
    const user = {
      email: "caduvitorinog@gmail.com",
      password: "123123",
    };
    request(app).post("/login").send(user).expect(200, done);
  });
});
