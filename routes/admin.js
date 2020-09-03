const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin/admin");

const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
router.get("/", authMiddleware, adminMiddleware, adminController.adminPage);
router.post(
  "/userPremissions",
  authMiddleware,
  adminController.userPremissions
);

module.exports = router;
