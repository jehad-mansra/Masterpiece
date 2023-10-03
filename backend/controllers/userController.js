const User = require("../models/user");
const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();

//endpoint to register in the app

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
      verificationToken: crypto.randomBytes(20).toString("hex"), // Generate and store the verification token
    });

    // Debugging statement to verify data
    console.log("New User Registered:", newUser);

    // Send verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (err) {
    console.log("Error during registration:", err.message); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
};

//function to send verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "jehad.mansra@gmail.com",
      pass: "wjffljcdzcqzisdm",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const jwt = require("jsonwebtoken");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
const secretKey = generateSecretKey();

//endpoint to login the user!
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

//get the user profile
exports.userProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
};
