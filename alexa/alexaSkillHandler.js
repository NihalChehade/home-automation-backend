const express = require('express');
const router = express.Router();
const { controlLight, setBrightness, setColor } = require('../controllers/deviceController');

// Define handlers for intents
router.post('/alexa', (req, res) => {
  const { request } = req.body;
  switch (request.intent.name) {
    case 'TurnOnLight':
      return controlLight(req, res);
    case 'SetBrightness':
      return setBrightness(req, res);
    case 'SetColor':
      return setColor(req, res);
    default:
      return res.status(400).send('Unknown intent');
  }
});

module.exports = router;
