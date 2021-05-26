"use strict";

const Carwash = require("../models/Carwash.model");
const geolib = require("geolib");

class CarwashController {
  async index(req, res, next) {
    try {
      let carwash = await Carwash.find();
      res.status(200).send(carwash);
    } catch (err) {
      return res.status(400).send({
        error: "List Carwash failed",
        exception: err,
      });
    }
  }

  async listNext(req, res, next) {
    try {
      const { dist, latitude, longitude } = req.body;

      let carwash = await Carwash.find();
      let carwashNext = [];

      carwash.map((wash) => {
        const distCarwash = geolib.getDistance(
          { latitude, longitude },
          { latitude: wash.latitude, longitude: wash.longitude }
        );

        if (distCarwash <= dist * 1000) {
          carwashNext.push({
            wash,
            dist,
          });
        }
      });

      res.status(200).send(carwashNext);
    } catch (err) {
      return res.status(400).send({
        error: "List Carwash next failed",
        exception: err,
      });
    }
  }

  async store(req, res, next) {
    try {
      const { name } = req.body;
      const hasCarwash = await Carwash.find({ name });

      if (hasCarwash && hasCarwash.length > 0) {
        throw "Carwash already exists";
      }

      const newCarwash = await Carwash.create(req.body);

      res.status(201).send({ newCarwash });
    } catch (err) {
      return res.status(400).send({
        error: "Create Carwash failed",
        exception: err,
      });
    }
  }

  async updated(req, res, next) {
    try {
      const _id = req.params.id;
      const hasCarwash = await Carwash.find({ _id });

      if (!hasCarwash || hasCarwash.length <= 0) {
        throw "Carwash not exists";
      }

      const carwashUpdated = await Carwash.findOneAndUpdate({ _id }, req.body);

      res.status(200).send({ carwashUpdated });
    } catch (err) {
      return res.status(400).send({
        error: "Updated Carwash failed",
        exception: err,
      });
    }
  }

  async destroy(req, res, next) {
    try {
      const _id = req.params.id;
      let hasCarwash = await Carwash.find({ _id });

      if (!hasCarwash) {
        throw "Store not exists";
      }

      let carwashRemoved = await Carwash.findOneAndRemove({ _id });

      if (!carwashRemoved) {
        throw "Carwash not removed";
      }

      res.send({ carwashRemoved });
    } catch (err) {
      return res.status(400).send({
        error: "Remove Carwash failed",
        exception: err,
      });
    }
  }
}

module.exports = CarwashController;
