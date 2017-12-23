"use strict";

const { test, trait, before, after } = use("Test/Suite")("User");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("Auth/Client");
trait("DatabaseTransactions");

let adminUser;

before(async () => {
  adminUser = await User.create({
    username: "admin",
    email: "admin@tester.com",
    password: "password"
  });
});

after(async () => {
  const user = await User.find(adminUser.id);
  await user.delete();
});

test("get list of users", async ({ client }) => {
  await User.create({
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  });

  const response = await client
    .get("/users")
    .loginVia(adminUser)
    .end();

  response.assertStatus(200);

  response.assertJSONSubset([
    {
      username: "tester",
      email: "tester@tester.com"
    }
  ]);
});

test("create a user", async ({ client, assert }) => {
  const body = {
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  };

  const response = await client
    .post("/users")
    .send(body)
    .loginVia(adminUser)
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({
    username: "tester",
    email: "tester@tester.com"
  });
});

test("update a user", async ({ client, assert }) => {
  const user = await User.create({
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  });

  const body = {
    email: "tester@testerplus.com"
  };

  const response = await client
    .put(`/users/${user.id}`)
    .send(body)
    .loginVia(adminUser)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: "tester",
    email: "tester@testerplus.com",
    id: user.id
  });
});

test("show a single user if present", async ({ client, assert }) => {
  const user = await User.create({
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  });

  const response = await client
    .get(`/users/${user.id}`)
    .loginVia(adminUser)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    username: "tester",
    email: "tester@tester.com"
  });
});

test("return a 404 if a user isn't found", async ({ client, assert }) => {
  const response = await client
    .get(`/users/300`)
    .loginVia(adminUser)
    .end();
  response.assertStatus(404);
});

test("removes a user", async ({ client, assert }) => {
  const user = await User.create({
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  });

  assert.equal(await User.getCount(), 2);

  const response = await client
    .delete(`/users/${user.id}`)
    .loginVia(adminUser)
    .end();

  response.assertStatus(204);
  assert.equal(await User.getCount(), 1);
});

test("logs a user in", async ({ client }) => {
  const body = {
    email: "tester@tester.com",
    password: "password"
  };

  const user = await User.create({
    username: "tester",
    ...body
  });

  const response = await client
    .post(`/users/login`)
    .send(body)
    .end();

  response.assertStatus(200);
});

test("registers a user", async ({ client, assert }) => {
  const body = {
    username: "tester",
    email: "tester@tester.com",
    password: "password"
  };

  const response = await client
    .post(`/users/register`)
    .send(body)
    .end();

  response.assertStatus(200);
  assert.ok(response.body.token);
});
