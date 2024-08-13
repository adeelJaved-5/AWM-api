const Joi = require("joi");

const paintUpdate = {
  body: Joi.object({
    hitlineClasses: Joi.string().required(),
  }),
};

module.exports = {
  paintUpdate,
};
