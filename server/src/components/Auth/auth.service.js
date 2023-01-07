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
    try {
      let results = await query("select * from users where username = $1 or email = $1", [requestBody.username]);
      if (results.rowCount <= 0)
        return {status_code: 404, message: "User not found!"};
      const passwordIsValid = await bcrypt.compare(requestBody.password, results.rows[0].password);
      if (!passwordIsValid)
        return {status_code: 401, message: "Invalid Password!"};
      if (results.rows[0].is_email_verified !== true)
        return {status_code: 401, message: "please verifiy your email"};
      return {status_code: 200, message: "User logged in successfully!", user: results.rows[0]};
    } catch (error) {
      return {status_code: 409, message: "Unable to login user!"};
    }
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
