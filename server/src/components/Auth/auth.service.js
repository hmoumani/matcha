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
    let results;
    try{
      results = await query("select * from users where username = $1 or email = $1", [requestBody.username]);
    } catch (error) {
      throw new Error("unable to login");
    }
    if (results.rowCount <= 0)
      throw new Error("User not found!");
    const passwordIsValid = await bcrypt.compare(requestBody.password, results.rows[0].password);
    // if (!passwordIsValid) TODO
      // throw new Error("Invalid Password!");
    if (results.rows[0].is_email_verified !== true)
      throw new Error("please verifiy your email");
    return results.rows[0].id;
  },
  register: async (requestBody) => {
    const password = bcrypt.hashSync(requestBody.password, 8);
    let results = await query("insert into users (first_name, last_name, username, email, password) values ($1, $2, $3, $4, $5) RETURNING id", [requestBody.firstName, requestBody.lastName, requestBody.username, requestBody.email, password]);
    return {status_code: 200, message: "User registered successfully!", registredUserId: results.rows[0].id};
  },
  verifyEmail: async (requestBody) => {
    let results = await query("select * from validation_tokens where token=$1 and token_type=$2", [requestBody.token, "email"]);
    if (results.rowCount <= 0)
      throw new Error("Invalid token");
    await query("update users set is_email_verified = true where id = $1", [results.rows[0].user_id]);
    await query("delete from validation_tokens where token = $1", [requestBody.token]);
  },
  resetPassword: async (requestBody) => {
    let results = await query("select * from validation_tokens where token=$1 and token_type=$2", [requestBody.token, "password"]);
    const password = bcrypt.hashSync(requestBody.password, 8);
    if (results.rowCount <= 0)
      throw new Error("Invalid token");
    await query("update users set password = $1 where id = $2", [password, results.rows[0].user_id]);
    await query("delete from validation_tokens where token = $1", [requestBody.token]);
  },
  getUserIdByEmail: async (email) => {
    let results = await query("select id from users where email=$1", [email]);
    if (results.rowCount <= 0)
      throw new Error("Invalid email");
    return results.rows[0].id;
  }
};

export default AuthService;
