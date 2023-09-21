const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const newInfo = req.body;
    if (!newInfo) {
      const exception = new Error(`Missing required data.`);
      exception.statusCode = 402;
      throw exception;
    }
    const newCar = await Car.create(newInfo);
    res.status(200).send({
      message: "Create Car Successfully!",
      car: newCar,
    });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = limit * (page - 1);
    const carFullList = await Car.find({ isDeleted: false });
    const totalPages = Math.ceil(carFullList.length / limit);
    const carList = carFullList.slice(offset, offset + limit);

    res.status(200).send({
      message: "Get Car List Successfully!",
      cars: carList,
      page: page,
      total: totalPages,
    });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id } = req.params;
    const updatedInfo = req.body;

    if (!updatedInfo) {
      const exception = new Error(`Missing required data.`);
      exception.statusCode = 402;
      throw exception;
    }

    if (!mongoose.isValidObjectId(id)) {
      const exception = new Error("Wrong ID types!");
      exception.status = 402;
      throw exception.message;
    }

    const options = { new: true };

    const updatedCar = await Car.findByIdAndUpdate(id, updatedInfo, options);

    res.status(200).send({
      message: "Update Car Successfully!",
      car: updatedCar,
    });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    // YOUR CODE HERE
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      const exception = new Error("Wrong ID types!");
      exception.status = 402;
      throw exception.message;
    }
    const options = { new: true };

    const deletedCar = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );
    res.status(200).send({
      message: "Delete Car Successfully!",
      car: deletedCar,
    });
  } catch (err) {
    // YOUR CODE HERE
    next(err);
  }
};

module.exports = carController;
