const request = require("supertest"); // Supertest supports promises -> can use "await"
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Charles Campion",
  email: "charles.campion@thestand.com",
  password: "somethingNew123!",
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
    // We should expect it to be created
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
