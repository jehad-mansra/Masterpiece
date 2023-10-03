const dotenv = require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const addressesRouter = require("./routes/addressesRouter");
const ordersRouter = require("./routes/ordersRouter");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.use("/api/v1/user", userRouter);
app.use("/api/v1/addresses", addressesRouter);
app.use("/api/v1/orders", ordersRouter);

const User = require("./models/user");
//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});
