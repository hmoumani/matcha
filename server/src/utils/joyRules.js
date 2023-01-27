import Joi from '@hapi/joi';

export const locationRule = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required()
});
