const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const logoutController = require("../controllers/auth/logout");
const signinController = require("../controllers/auth/signin");
const updateController = require("../controllers/auth/update");

const authMiddleware = require("../middleware/auth");
router.get("/login", loginController.loginPage);
router.post("/login", loginController.login);

router.get("/logout", logoutController.logout);

router.get("/signin", signinController.signinPage);
router.post("/signin", signinController.signin);

router.get("/update", authMiddleware, updateController.updatePage);
router.post("/update", updateController.update);

module.exports = router;
