const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");
const {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrdersForAnalysis
} = require("../controllers/orderController");

// User routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);
router.put("/paid/:id", updateOrderToPaid);

// Admin routes
router.use(verifyIsAdmin);
router.put("/delivered/:id", updateOrderToDelivered);
router.get("/admin", getOrders)
router.get("/analysis/:date", getOrdersForAnalysis)

module.exports = router;
