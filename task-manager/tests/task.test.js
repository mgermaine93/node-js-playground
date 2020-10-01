const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
} = require("./fixtures/db");
const { response } = require("express");

beforeEach(setupDatabase);

test("Should create task for authorized user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "From my test." })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  // Is the task added to the user's list of tasks?
  expect(response.body.length).toEqual(2);
  // Is "completed" set to "false" by default?
  expect(response.body[0].completed).toBe(false);
});

test("Should not delete other user's tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

test("Should not create task with invalid description", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: 1 })
    .expect(400);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBe(1);
});

test("Should not allow user to delete other user's task", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `${userTwo}.tokens[0].token`)
    .send()
    .expect(401); // unauthorized error

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});

test("Should delete task for authorized user", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const task = await Task.findById(taskOne._id);
  expect(task).toBeNull();
});

test("Should not delete task for unauthorized user", async () => {
  await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);
});

test("Should not update other user's task", async () => {
  await request(app)
    .patch(`/tasks/update/${taskThree._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "New task three" })
    .expect(404);
  const task = await Task.findById(taskThree._id);
  expect(task.description).not.toBe("New task three");
});

test("Should fetch user task by id", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.description).toBe(taskOne.description);
});

test("Should not fetch user task by id if unauthenticated", async () => {
  await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
});

test("Should not fetch other user's task by id", async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
});

test("Should fetch only completed tasks", async () => {
  const response = await request(app)
    .get(`/tasks?completed=true`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).not.toBeNull();
});

test("Should fetch only incomplete tasks", async () => {
  const response = await request(app)
    .get(`/tasks?completed=false`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).not.toBeNull();
});

test("Should sort tasks by description", async () => {
  const response = await request(app)
    .get(`/tasks?sortBy=description:desc`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body[0].description).toBe("Second task");
});

test("Should sort tasks by createdAt", async () => {
  const response = await request(app)
    .get(`/tasks?sortBy=createdAt:desc`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body[0].description).toBe("Second task");
});

test("Should sort tasks by updatedAt", async () => {
  // Updating a task
  await Task.findByIdAndUpdate(taskOne._id, { description: "New description" });
  const response = await request(app)
    .get(`/tasks?sortBy=updatedAt:desc`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  // Is most recently-updated task the one with description "New description"?
  expect(response.body[0].description).toBe("New description");
});

test("Should fetch pages of tasks", async () => {
  const response = await request(app)
    .get("/tasks?limit=2")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);
});
