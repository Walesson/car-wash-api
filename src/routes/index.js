const apiRoute = require("./api.router");
const authRoute = require("./auth.router");
const storeRoute = require("./carwash.router");

module.exports = (app) => {
  apiRoute(app);
  authRoute(app);
  storeRoute(app);
};
