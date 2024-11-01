const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk-core');

const skillBuilder = Alexa.SkillBuilders.custom();

// Assuming the skill instance is created and intents are registered elsewhere
const skill = skillBuilder.create();

const alexaAdapter = new ExpressAdapter(skill, true, true);

module.exports = {
  alexaVerifier: (req, res, next) => {
    // Use the adapter to verify Alexa requests
    try {
      alexaAdapter.getRequestHandlers(req, res);
      next();  // Move to next middleware once Alexa request is handled
    } catch (error) {
      console.error('Verification Failed:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};
