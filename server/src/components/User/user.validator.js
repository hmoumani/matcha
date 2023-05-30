import joi from '@hapi/joi';
import hapi from '@hapi/joi-date';
import { locationRule } from '../../utils/joyRules';

const Joi = joi.extend(hapi);

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const getUserValidator = (req) => {
  const schema = Joi.object({
    id: Joi.number().allow('mine'),
  });
  return schema.validate(req.params, options);
};

const updateSettings = ({ body }) => {
  const schema = Joi.object({
    minAge: Joi.number().min(18).max(100),
    maxAge: Joi.number().min(18).max(100),
    minFameRating: Joi.number().min(1).max(10),
    maxFameRating: Joi.number().min(1).max(10),
    location: locationRule,
    commonTags: Joi.array().items(Joi.string()),
    sortBy: Joi.string().valid('age', 'distance', 'fame_rate', 'common_passions_count')
  });
  return schema.validate(body, options);
};

const updateUserInfo = ({ body }) => {
  const schema = Joi.object({
    passions: Joi.array().items(Joi.string()),
    biography: Joi.string().optional().allow(null).allow('').max(500),
    gender: Joi.string().valid('male', 'female').insensitive(),
    sexualOrientation: Joi.string().valid('male', 'female', 'both').insensitive(),
    isAutoLocatorEnabled: Joi.boolean(),
    location: locationRule,
    email: Joi.string().email(),
    firstName: Joi.string().messages({
      'string.pattern.base': 'Provide valid first name'
    }),
    lastName: Joi.string().messages({
      'string.pattern.base': 'Provide valid last name'
    }),
  });
  return schema.validate(body, options);
};

const reportUser = (req) => {
  const { body, userId } = req;
  req.body.reporterId = userId;
  const schema = Joi.object({
    reportedId: Joi.number().required(),
    reporterId: Joi.number().required().not(Joi.ref('reportedId'))
  });
  return schema.validate(body, options);
};

const blockUser = (req) => {
  const { body, userId } = req;
  req.body.blockerId = userId;
  const schema = Joi.object({
    blockerId: Joi.number(),
    blockedId: Joi.number().required().not(Joi.ref('blockerId'))
  });
  return schema.validate(body, options);
};

const searchUserValidator = (req) => {
  const schema = Joi.object({
    keyword: Joi.string().not('')
  });
  return schema.validate(req.params, options);
};

export default {
  getUserValidator,
  updateSettings,
  updateUserInfo,
  reportUser,
  blockUser,
  searchUserValidator
};
