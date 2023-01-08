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
    username: Joi.string().required().messages({
      'string.pattern.base': 'Provide valid username'
    }),
    password: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};

const validateRegistration = (httpRequest) => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.pattern.base': 'Provide valid first name'
    }),
    lastName: Joi.string().required().messages({
      'string.pattern.base': 'Provide valid last name'
    }),
    password: Joi.string().min(8).max(20).alphanum().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required().messages({
      'string.pattern.base': 'Provide valid username'
    })
});
  return schema.validate(httpRequest.body, options);
};

const validateEmailValidation = (httpRequest) => {
  const schema = Joi.object({
    token: joi.string().required().messages({
      'string.pattern.base': 'invalid token'
    })
  });
  return schema.validate(httpRequest.body, options);
};

const validateresetPasswordEmail = (httpRequest) => {
  const schema = Joi.object({
    email: joi.string().email().required()
  });
  return schema.validate(httpRequest.body, options);
};

const validateresetPassword = (httpRequest) => {
  const schema = Joi.object({
    token: joi.string().required(),
    password: Joi.string().min(8).max(20).alphanum().required()
  });
  return schema.validate(httpRequest.body, options);
};

export default {
  validateLogin,
  validateRegistration,
  validateEmailValidation,
  validateresetPasswordEmail,
  validateresetPassword
};
