const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/authentication");

const router = new express.Router();

////////////////////// USERS /////////////////////////

// Create a user
router.post("/users", async (request, response) => {
  const user = new User(request.body);

  try {
    // Awaits the promise that comes back from calling the save method
    await user.save();
    const token = await user.generateAuthToken();
    response.status(201).send({ user, token });
  } catch (error) {
    response.status(400).send(error);
  }
});

// Login
router.post("/users/login", async (request, response) => {
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();
    response.send({ user, token });
  } catch (error) {
    response.status(400).send();
  }
});

// Logout
router.post("/users/logout", auth, async (request, response) => {
  try {
    request.user.tokens = request.user.tokens.filter((token) => {
      return token.token !== request.token;
    });
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

// Logout All
router.post("/users/logoutAll", auth, async (request, response) => {
  try {
    // Set the tokens to an empty array
    request.user.tokens = [];
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

// Read // Gets a user's own profile when they're authenticated
router.get("/users/me", auth, async (request, response) => {
  response.send(request.user);
});

// Patch updates an existing resource
// Here we update an individual user by his/her ID ... allows users to update their profiles
router.patch("/users/me", auth, async (request, response) => {
  const updates = Object.keys(request.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  // Runs a function for every item in the array
  // If EVERYTHING is true, the function will return true
  // If SOMETHING is false, the function will return false
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return response
      .status(400)
      .send({ error: "Some of those updates were invalid!" });
  }

  try {
    // Dynamic updating
    updates.forEach((update) => (request.user[update] = request.body[update]));
    await request.user.save();

    // If everything goes well, send back the current (updated) user data
    response.send(request.user);
  } catch (error) {
    // If something goes wrong, send back the error message
    response.status(400).send(error);
  }
});

// Allows a user to delete their own profile
router.delete("/users/me", auth, async (request, response) => {
  try {
    await request.user.remove();
    // Sends the deleted user as the response body
    response.send(request.user);
  } catch (error) {
    response.status(500).send();
  }
});

// Tells multer to store avatar photos in the "avatars" directory
const upload = multer({
  limits: {
    fileSize: 5000000, // size is in bytes.  this restricts the upload size to five megabytes.
  },
  // Determines which file types are allowed
  // cb = lets multer know when we're done filtering the file
  fileFilter(request, file, cb) {
    // Uses regex -- i is case-insensitive

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      // This will run if the file is NOT an image
      return cb(new Error("Please upload a .jpg, .jpeg, or .png document."));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  // Tells multer to look for the "avatar" key in Postman, etc.
  upload.single("avatar"),
  async (request, response) => {
    request.user.avatar = request.file.buffer;
    await request.user.save();
    response.status(200).send();
  },
  (error, request, response, next) => {
    response.status(400).send({ error: error.message });
  }
);

// Allows a user to delete their own avatar
router.delete("/users/me/avatar", auth, async (request, response) => {
  try {
    request.user.avatar = undefined;
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(500).send();
  }
});

// Access the image of a user by the user's id
router.get("/users/:id/avatar", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    // If there is no user OR there is no user avatar field associated with the account
    if (!user || !user.avatar) {
      throw new Error();
    }
    response.set("Content-Type", "image/jpg");
    response.send(user.avatar);
  } catch (error) {
    response.status(404).send();
  }
});

// const multer = require("multer");

// Configures the server to upload and save files
// Multer looks for the file named "upload" in the request
// app.post("/upload", upload.single("upload"), (request, response) => {
//   response.send();
// });

module.exports = router;
