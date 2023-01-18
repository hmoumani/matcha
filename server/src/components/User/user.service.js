import { query } from "../../db/index";
const UserService = {
  getUserPassions: async (userId) => {
    const { rows } = await query("SELECT \
      tags.value as tag, \
      user_tags.id as user_tags_id \
      FROM users \
      JOIN user_tags ON users.id = user_tags.user_id \
      JOIN tags ON tags.id = user_tags.tag_id \
      where users.id = $1", [userId]);
    return rows;
  },

  getUserAvatars: async (userId) => {
    const { rows } = await query("SELECT \
      id, value, created_at \
      FROM images \
      where images.user_id = $1", [userId]);
    return rows;
  },  

  find: async (userId) => {
    let user = await query('SELECT \
      users.id, \
      users.first_name, \
      users.last_name, \
      users.age, \
      users.last_location, \
      users.biography as bio, \
      users.sexual_orientation\
      FROM users\
    WHERE users.id = $1', [userId]);
    if (user.rows.length === 0)
      throw new Error('User not found');
    user = user.rows[0];
    const passions = await UserService.getUserPassions(userId);
    const avatars = await UserService.getUserAvatars(userId);
    user = {
      ...user,
      sexual_orientation: user.sexual_orientation ? user.sexual_orientation : 'heterosexual',
      passions,
      avatars
    };
    return user;
  },
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  like: async (userId) => {}
};

export default UserService;
