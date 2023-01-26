import Model from './Model.js';

class UserModel extends Model {
  //   tableName = 'user_settings';

  constructor() {
    super('users');
  }
}

export default UserModel;
