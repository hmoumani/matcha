import {query} from "../../db/index.js";
import bcrypt from "bcryptjs";

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
    const password = bcrypt.hashSync(requestBody.password, 8);
    await query("insert into users (first_name, last_name, username, email, password) values ($1, $2, $3, $4, $5)", [requestBody.firstName, requestBody.lastName, requestBody.username, requestBody.email, password]);
    return {status_code: 200, message: "User registered successfully!"};
  }
};

export default AuthService;
