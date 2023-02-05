import { query } from '../../db/index';
import jwt from 'jsonwebtoken';
import config from './auth.config';
import crypto from 'crypto';
import axios from 'axios';

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

const getUserIdFromToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }
  try {
    let payload = jwt.verify(token, config.secret);
    req.userId = payload.id;
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized!'
    });
  }
};

const HashPasswordAndCheckCommunWord = async (req, res, next) => {
  try {
    let { password } = req.body;
    password = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    const hash_prefix = password.substring(0,5)
    const hash_suffix = password.substring(5)
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${hash_prefix}`)
    const pwnedPasswords = response.data.split("\r\n")
    const found = pwnedPasswords.find(p => p.split(':')[0] === hash_suffix)
    if (pwnedPasswords.find(p => p.split(':')[0] === hash_suffix))
      return res.status(400).json({ errors: [{ msg: 'This password is a common word, please choose a different one.' }] });
    req.body.password = password;
    next()
  } catch (error) {
    return res.status(406).send({
      message: 'Unable to validate password!' + error
    });
  }
};

export { checkDuplicateUsernameOrEmail, getUserIdFromToken, checkEmailexists, HashPasswordAndCheckCommunWord };
