const request = require("supertest"); // Supertest supports promises -> can use "await"
const app = require("../src/app");
const User = require("../src/models/user");
// Object destructuring in action
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

// This will assure that users are deleted before Jest actually runs its tests
beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  // This passes in the express application
  const response = await request(app)
    .post("/users")
    .send({
      name: "Tony",
      email: "tony.delvecchio@backyardbaseball.com",
      password: "tonyLikesBaseball123",
    })
    // We should expect the user to be created
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      // Add more properties as needed.  They need to be properties that each user already has, such as (for here) a name and an email address.
      name: "Tony",
      email: "tony.delvecchio@backyardbaseball.com",
    },
    // Asserts that the token that comes back matches the token in the database
    token: user.tokens[0].token,
  });
  // Asserts that the password is not stored as plaintext
  expect(user.password).not.toBe("tonyLikesBaseball123");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Validates that a new token was saved
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "This is a fake password",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Asserts that a user was deleted from the database
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/pittsburgh.JPG")
    .expect(200);
  const user = await User.findById(userOneId);
  // Looks at the avatar property and checks to see if it is binary data stored in a Buffer.
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    // Authorization is needed for a user to change their name
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Edwin" })
    .expect(200);
  // Asserts that the name has been changed from "Charles" to "Edwin"
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Edwin");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "Arnette, Texas" })
    .expect(400);
});

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
