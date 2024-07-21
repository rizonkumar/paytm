const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");
const JWT_SECRET = require("../config");

// sign up routes

const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedResult = signupSchema.safeParse(body);

  if (!parsedResult.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: parsedResult.error.errors,
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Username already taken",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const dbUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = dbUser._id;

  // Initialize balances on signup so user can play with it
  await Account.create({
    userId,
    balance: 1 + Math.random() * 100000
  })

  const token = jwt.sign({
    userId
  },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

// Sign in Routes
const signinSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedResult = signinSchema.safeParse(body);

  if (!parsedResult.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: parsedResult.error.errors,
    });
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "Signed in successfully",
    token: token,
  });
});

// Route updates the information of a user. It uses authMiddleware to ensure that only authenticated users can access this route. The user's information is updated based on the request body.

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// Ruote to get all the user in database
// This route fetches a list of users based on a filter applied to their first or last names. It supports searching through user names using a regular expression.

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;