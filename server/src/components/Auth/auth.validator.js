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

const validateLogin = (httpRequest) => {
  const schema = Joi.object({
    phone: Joi.string()
      .required()
      .messages({
        'string.pattern.base': 'Provide valid phone number!'
      }),
    password: Joi.string().min(8).max(20).alphanum().required()
  });
  return schema.validate(httpRequest.body, options);
};

export default {
  validateLogin
};
