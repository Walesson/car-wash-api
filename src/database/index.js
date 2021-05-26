const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb:27017/carwash", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.info("DATABASE CONNECTED");
});

module.exports = mongoose;
