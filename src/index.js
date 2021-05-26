const express = require("express");
const bodyParse = require("body-parser");

const PORT = 4000;
const App = express();
const routes = require("./routes");
const cors = require("cors");

App.use(cors());
App.use(bodyParse.json());
App.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
routes(App);

App.listen(PORT, () => console.info("Server Node API running..."));
