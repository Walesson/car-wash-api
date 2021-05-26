"use strict";

const mongoose = require("../database");

const CarwashSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    unique: true,
    required: true,
  },
  street: {
    type: String,
    lowercase: true,
    required: true,
  },
  number: {
    type: String,
    lowercase: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Carwash = mongoose.model("Store", CarwashSchema);

module.exports = Carwash;
