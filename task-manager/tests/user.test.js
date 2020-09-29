const request = require("supertest"); // Supertest supports promises -> can use "await"
const jwt = require("jsonwebtoken"); // Generates the JSON web token
const mongoose = require("mongoose"); // Generates an object id
const app = require("../src/app");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Charles Campion",
  email: "charles.campion@thestand.com",
  password: "somethingNew123!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET), // creates the JSON web token
    },
  ],
};

beforeEach(async () => {
  // This will assure that users are deleted before Jest actually runs its tests
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  // This passes in the express application
  await request(app)
    .post("/users")
    .send({
      name: "Tony",
      email: "tony.delvecchio@backyardbaseball.com",
      password: "tonyLikesBaseball123",
    })
    // We should expect the user to be created
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
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
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
