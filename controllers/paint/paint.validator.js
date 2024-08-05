const Joi = require("joi");

const paintUpdate = {
  body: Joi.object({
    hitlineClasses: Joi.array().items(Joi.string()).required(),
  }),
};

module.exports = {
  paintUpdate,
};
