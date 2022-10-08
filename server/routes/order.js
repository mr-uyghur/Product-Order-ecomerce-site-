const express = require("express");
const { createOrder, getOrders, deleteOrders, updateOrder } = require("../controllers/order");
const router = express.Router();

router.post("/create", createOrder);
router.get("/get", getOrders);
router.delete("/delete/:id", deleteOrders);
router.patch("/update/:id", updateOrder);


module.exports = router;