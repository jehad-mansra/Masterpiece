const express = require("express");
const { createOrders, getOrder } = require("../controllers/ordersController");

const router = express.Router();

router.route("/").post(createOrders);
router.route("/:userId").get(getOrder);

module.exports = router;
