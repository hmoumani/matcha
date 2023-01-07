const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} When the user is not found.
   */

  find: async (userId) => {
    const passions = [
      { name: 'video games', isCommon: false },
      { name: 'football', isCommon: true },
      { name: 'Gym', isCommon: false }
    ];
    let user = {
      id: 4,
      first_name: 'senko',
      last_name: 'von doom',
      age: '567',
      address: 'CNS shore 14',
      gender: 'Male',
      bio: 'aaamzaing bro, :))))))) ||| ',
      sexualOrientation: 'Female',
      passions
    };
    return { user };
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

export default AuthService;
