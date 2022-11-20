import { app } from "../../app";
import request from "supertest";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      username: "test-integration",
      password: "passwordtesting",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    await request(app).post("/users").send({
      username: "test-integration-exist",
      password: "test-integration-exist-pass"
    });

    const response = await request(app).post("/users").send({
      username: "test-integration-exist",
      password: "test-integration-exist-pass"
    });

    expect(response.status).toBe(400);
  });
});