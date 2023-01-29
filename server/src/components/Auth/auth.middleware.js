import { query } from '../../db/index';
import jwt from 'jsonwebtoken';
import config from './auth.config';

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

const getUserFromSocket = async (socket, next) => {
  const userToken = socket.handshake.query.token;
  let user = jwt.verify(userToken, config.secret);
  if (!user) {
    return next(new Error('Unauthorized'));
  }
  socket.user = user;
  next();
};

export { checkDuplicateUsernameOrEmail, getUserIdFromToken, checkEmailexists, getUserFromSocket };
