const express = require('express');
const Device = require('../models/deviceModel');
const { ensureLoggedIn } = require('../middleware/auth');  
const jsonschema = require("jsonschema");
const deviceNewSchema = require("../schemas/deviceNew.json");
const deviceUpdateSchema = require("../schemas/deviceUpdate.json");
const { BadRequestError } = require("../expressError");

const router = express.Router();
const deviceController = require('../controllers/deviceController');

// Route to handle device creation
router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, deviceNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const newDevice = await Device.create({ ...req.body, user_name: res.locals.user.username });
    res.status(201).json(newDevice);
  } catch (error) {
    return next(error);
  }
});

// Route to update a device
router.patch('/:name', ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, deviceUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const updatedDevice = await Device.update(req.params.name, req.body);
    res.json(updatedDevice);
  } catch (error) {
    return next(error);
  }
});

// Route to delete a device
router.delete('/:name', ensureLoggedIn, async (req, res, next) => {
  try {
    const deletedDevice = await Device.remove(req.params.name);
    res.json({ deleted: deletedDevice.name });
  } catch (error) {
    return next(error);
  }
});

// Route to get a device
router.get('/:name', ensureLoggedIn, async (req, res, next) => {
  try {
    const device = await Device.findByDeviceName(req.params.name);
    res.json(device);
  } catch (error) {
    return next(error);
  }
});

// Route to list all devices for a user
router.get('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const devices = await Device.findByUserName(res.locals.user.username);
    res.json(devices);
  } catch (error) {
    return next(error);
  }
});

// Route to control light (on/off)
router.post('/lights/:name', ensureLoggedIn, deviceController.controlLight);

// Route to adjust the brightness of a light
router.post('/lights/:name/brightness', ensureLoggedIn, deviceController.setBrightness);

// Route to change the color of a light
router.post('/lights/:name/color', ensureLoggedIn, deviceController.setColor);

module.exports = router;
