const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/Auth.controller");

router.post("/register", new AuthController().register);
router.post("/login", new AuthController().login);

module.exports = (app) => app.use("/auth", router);
