const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({
    api: "Node v12.10.0",
    data: "API RESTfull",
    author: "Walesson Silva<walesson.silva.job@gmail.com>",
  });
});

router.get("*", function (req, res) {
  res.status(404).send("Not Found");
});

module.exports = (app) => app.use("/", router);
