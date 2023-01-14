import joi from '@hapi/joi';
import hapi from '@hapi/joi-date';

const Joi = joi.extend(hapi);

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const updateSettings = ({ body }) => {
  const schema = Joi.object({
    minAge: Joi.number().min(18).max(100),
    maxAge: Joi.number().min(18).max(100),
    minFameRating: Joi.number().min(1).max(10),
    maxFameRating: Joi.number().min(1).max(10),
    location: Joi.string(),
    commonTags: Joi.string()
  });
  return schema.validate(body, options);
};

export default {
  updateSettings
};
