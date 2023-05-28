import { query } from '../../db/index';
import jwt from 'jsonwebtoken';
import config from './auth.config';
import crypto from 'crypto';
import axios from 'axios';
import UserModel from '../../models/UserModel';

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await query('select * from users where username = $1 or email = $2', [
      req.body.username,
      req.body.email
    ]);
    if (user.rowCount > 0) {
      return res.status(400).send({
        message: 'Failed! Username or email is already in use!'
      });
    }

    next();
  } catch (error) {
    return res.status(406).send({
      message: 'Unable to validate Username and email!'
    });
  }
};

const checkEmailexists = async (req, res, next) => {
  try {
    const user = await query('select * from users where email = $1', [req.body.email]);
    if (user.rowCount === 0) {
      return res.status(404).send({
        message: 'Failed! Email does not exist!'
      });
    }
    next();
  } catch (error) {
    return res.status(406).send({
      message: 'Unable to validate Username and email!'
    });
  }
};

const getUserIdFromToken = async (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }
  try {
    let payload = jwt.verify(token, config.secret);
    req.userId = payload.id;
    const userModel = new UserModel();
    if (!await userModel.isInfoCompleted(req.userId) && req.route.path !== '/firstLogin') {
      return res.status(418).send({
        message: 'Please complete your profile!'
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized!'
    });
  }
};

const getUserFromSocket = async (socket, next) => {
  const userToken = socket.handshake.query.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(userToken, config.secret);
  } catch (e) {
    return next(new Error('Unauthorized'));
  }
  if (!decodedToken) {
    return next(new Error('Unauthorized'));
  }
  socket.userId = decodedToken.id;
  next();
};

const HashPasswordAndCheckCommunWord = async (req, res, next) => {
  let { password } = req.body;
  password = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const hash_prefix = password.substring(0, 5);
  const hash_suffix = password.substring(5);
  try {
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${hash_prefix}`);
    const pwnedPasswords = response.data.split('\r\n');
    if (pwnedPasswords.find((p) => p.split(':')[0] === hash_suffix)) {
      return res
        .status(400)
        .send({'message': 'This password is a common word, please choose a different one.'});
    }
    req.body.password = password;
    next();
  } catch (error) {
    return res.status(406).send({
      message: 'Unable to validate password!'
    });
  }
};

export {
  checkDuplicateUsernameOrEmail,
  getUserIdFromToken,
  checkEmailexists,
  HashPasswordAndCheckCommunWord,
  getUserFromSocket
};
