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
    try {
      let password = bcrypt.hashSync(requestBody.password, 8);
      let results = await query("insert into users (first_name, last_name, username, email, password) values ($1, $2, $3, $4, $5)", [requestBody.firstName, requestBody.lastName, requestBody.username, requestBody.email, password]);
      return {status_code: 200, message: "User registered successfully!"};
    } catch (error) {
      return {status_code: 409, message: "Unable to register user!"};
    }
  }
};

export default AuthService;
