import Model from './Model.js';
import { query as executeQuery } from '../db/index';

class UserLikesModel extends Model {
  constructor() {
    super('user_likes');
  }
}

export default UserLikesModel;
