const express = require("express");
const router = express.Router();
const codeController = require("../controllers/code.controller.js");
const authMiddleware = require("../middlewares/auth.milddleware.js");

router.post("/run", codeController.runCode);

module.exports = router;
