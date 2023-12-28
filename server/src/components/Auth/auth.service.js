import { query } from '../../db/index.js';
import SettingsModel from '../../models/SettingsModel';
import UserModel from '../../models/UserModel';
import ValidationTokenModel from '../../models/ValidationTokenModel';
import crypto from 'crypto';
import TagModel from '../../models/TagModel.js';
import UserTagModel from '../../models/UserTagModel.js';
import cons from 'consolidate';

const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  login: async (requestBody) => {
    let results;
    try {
      results = await query('select * from users where username = $1 or email = $1', [requestBody.username]);
    } catch (error) {
      throw new Error('unable to login');
    }

    if (results.rowCount <= 0) {
      throw new Error('User not found!');
    }

    if (crypto.createHash('sha1').update(requestBody.password).digest('hex').toUpperCase() !== results.rows[0].password) {
      throw new Error('Invalid Password!');
    }

    if (results.rows[0].is_email_verified !== true) {
      throw new Error('please verifiy your email');
    }

    return results.rows[0].id;
  },
  loginWithFakeUser: async () => {
    let fakeUser;

    let randomUserQuery = 'SELECT * FROM users WHERE is_fake = true ORDER BY RANDOM() LIMIT 1;'

    try {
      console.log(randomUserQuery)
      fakeUser = await query(randomUserQuery);
    } catch (error) {
      console.log(error)
      throw new Error('unable to login');
    }
    console.log(fakeUser)

    return fakeUser.rows[0].id
  },
  register: async (requestBody) => {
    let results = await query(
      'insert into users (first_name, last_name, username, email, password,  fame_rate, is_fake) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [requestBody.firstName, requestBody.lastName, requestBody.username, requestBody.email, requestBody.password, 5, false]
    );
    const registeredUserId = results.rows[0].id;

    const settingsModel = new SettingsModel();

    await settingsModel.insert({
      user_id: registeredUserId,
      minAge: 18,
      maxAge: 30,
      minFameRating: 5,
      maxFameRating: 10,
      sortBy: 'distance',
    });

    return registeredUserId;
  },
  verifyEmail: async (requestBody) => {
    let results = await query('select * from validation_tokens where token=$1 and token_type=$2', [
      requestBody.token,
      'email'
    ]);

    if (results.rowCount <= 0) {
      throw new Error('Invalid token');
    }

    await query('update users set is_email_verified = true where id = $1', [results.rows[0].user_id]);
    await query('delete from validation_tokens where token = $1', [requestBody.token]);
  },
  resetPassword: async (requestBody) => {
    let results = await query('select * from validation_tokens where token=$1 and token_type=$2', [
      requestBody.token,
      'password'
    ]);
    if (results.rowCount <= 0) {
      throw new Error('Invalid token');
    }
    const userModel = new UserModel(); 
    const validationTokenModel = new ValidationTokenModel();
    await userModel.update({password: requestBody.password}, ['id', '=', results.rows[0].user_id]);
    await validationTokenModel.delete([['token', '=', requestBody.token]]);
  },
  getUserIdByEmail: async (email) => {
    let results = await query('select id from users where email=$1', [email]);
    if (results.rowCount <= 0) {
      throw new Error('Invalid email');
    }
    return results.rows[0].id;
  },
  firstLogin: async (requestBody, userId) => {
    const userModel = new UserModel();
    const passions = requestBody.passions;
    delete requestBody.passions;
    await userModel.update(requestBody, ['id', '=', userId]);
    const tagModel = new TagModel();
    const tags_ids = await tagModel.insert(passions);
    const userTagModel = new UserTagModel();
    await userTagModel.insert(userId, tags_ids);
  }
};

export default AuthService;
