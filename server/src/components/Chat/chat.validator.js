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

const getChatValidator = (httpRequest) => {
  const schema = Joi.object({
    userId: Joi.number().required().messages({
      'string.pattern.base': 'Provide valid userId'
    }),
  });
  return schema.validate(httpRequest.req, options);
};

export default {
  getChatValidator
};
