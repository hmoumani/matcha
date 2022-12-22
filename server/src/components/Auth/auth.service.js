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
    return "hello world";
  },
  register: async (requestBody) => {
    return "yoo everybody";
  }
};

export default AuthService;
