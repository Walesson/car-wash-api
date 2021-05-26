"use strict";

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

class AuthController {
  async register(req, res, next) {
    try {
      const { email } = req.body;
      let find = await User.findOne({ email });

      if (find) {
        return res.status(200).send({ error: "User already exists" });
      }

      const newUser = await User.create(req.body);

      newUser.password = undefined;

      res.status(201).send({ newUser });
    } catch (err) {
      return res.status(400).send({
        error: "Registration failed",
        exception: err,
      });
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw "User is required";
      }

      let user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw "User not found";
      }

      let status = await bcrypt.compare(password, user.password);

      if (!status) {
        throw "User not permitted";
      }

      user.password = undefined;

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
      });

      res.status(200).send({ user, token });
    } catch (err) {
      return res.status(401).send({
        error: "Login failed",
        exception: err,
      });
    }
  }
}

module.exports = AuthController;
