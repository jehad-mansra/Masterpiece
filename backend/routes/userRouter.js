const express = require("express");
const {
  register,
  login,
  userProfile,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/:userId").get(userProfile);

module.exports = router;
