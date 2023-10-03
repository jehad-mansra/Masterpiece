const express = require("express");
const {
  createAddresses,
  getAddresses,
} = require("../controllers/addressesController");

const router = express.Router();

router.route("/").post(createAddresses);
router.route("/:userId").get(getAddresses);

module.exports = router;
