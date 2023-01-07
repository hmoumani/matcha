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
    let results = await query("insert into users (first_name, last_name, username, email, password) values ($1, $2, $3, $4, $5) RETURNING id", [requestBody.firstName, requestBody.lastName, requestBody.username, requestBody.email, password]);
    return {status_code: 200, message: "User registered successfully!", registredUserId: results.rows[0].id};
  },
  verifyEmail: async (requestBody) => {
    let results = await query("select * from validation_tokens where token=$1", [requestBody.token]);
    if (results.rowCount <= 0)
      throw new Error("Invalid token");
    await query("update users set is_email_verified = true where id = $1", [results.rows[0].user_id]);
    await query("delete from validation_tokens where token = $1", [requestBody.token]);
    return {status_code: 200, message: "Email verified successfully!"};
  }
};

export default AuthService;
