const express = require("express");
const router = express.Router();
const CarwashController = require("../controllers/Carwash.controller");
const middleware = require("../middlewares/auth");

router.use(middleware);
router.get("/", new CarwashController().index);
router.post("/next/carwash", new CarwashController().listNext);
router.post("/", new CarwashController().store);
router.put("/:id", new CarwashController().updated);
router.delete("/:id", new CarwashController().destroy);

module.exports = (app) => app.use("/carwash", router);
