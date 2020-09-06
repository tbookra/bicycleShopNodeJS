const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin/admin");
const adminItemController = require("../controllers/admin/itemPremissions");

const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

router.use(authMiddleware);

router.get("/", adminMiddleware, adminController.adminPage);

router.post("/userPremissions", adminController.userPremissions);

router.post("/itemCreate", adminItemController.adminItemCreate);

router.post("/itemUpdate", adminItemController.adminItemUpdate);

router.post("/itemDelete", adminItemController.adminItemDelete);

module.exports = router;
