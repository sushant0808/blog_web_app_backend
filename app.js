const express = require("express");
const cors = require("cors");
const User = require("./models/UserModel");
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"],
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.post("/register", async (req, res) => {
  try {
    console.log("REQ.BODY", req.body);

    const newUser = await User.create(req.body);

    console.log("NEWUSER", newUser);

    // Convert the Mongoose document to a plain JavaScript object
    const finalUserObject = newUser.toObject();

    // Remove the 'password' field from the newUser object
    delete finalUserObject.password;

    console.log("finallyy", finalUserObject);

    res.status(200).json({
      status: "success",
      message: "User registration successful",
      data: {
        user: finalUserObject,
      },
    });
  } catch (err) {
    console.log("Error 💥💥💥", err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User with this email does not exist",
      });
    }

    if (password === user.password) {
      res.status(200).json({
        status: "success",
        message: "Login Successful",
      });
    }
  } catch (err) {
    console.log("Error 💥💥💥", err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

app.delete("/delete-all", async (req, res) => {
  await User.deleteMany();
  res.json({
    message: "Deleted successfully",
  });
});

module.exports = app;
