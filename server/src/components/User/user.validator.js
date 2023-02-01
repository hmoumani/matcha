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

const updateSettings = ({ body }) => {
  const schema = Joi.object({
    minAge: Joi.number().min(18).max(100),
    maxAge: Joi.number().min(18).max(100),
    minFameRating: Joi.number().min(1).max(10),
    maxFameRating: Joi.number().min(1).max(10),
    location: locationRule,
    commonTags: Joi.array().items(Joi.string()),
    sortBy: Joi.string().valid('age', 'location', 'fameRating', 'tags')
  });
  return schema.validate(body, options);
};

const updateUserInfo = ({ body }) => {
  const schema = Joi.object({
    passions: Joi.array().items(Joi.string()),
    biography: Joi.string(),
    gender: Joi.string().valid('male', 'female').insensitive(),
    sexualOrientation: Joi.string().valid('male', 'female', 'both').insensitive(),
    isAutoLocatorEnabled: Joi.boolean(),
    location: locationRule
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
  console.log(req);
  const schema = Joi.object({
    blockerId: Joi.number(),
    blockedId: Joi.number().required().not(Joi.ref('blockerId'))
  });
  return schema.validate(body, options);
};

export default {
  updateSettings,
  updateUserInfo,
  reportUser,
  blockUser
};
