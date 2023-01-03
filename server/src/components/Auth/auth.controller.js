import AuthService from "./auth.service";
import jwt from "jsonwebtoken";
import config from "./auth.config";

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (req, res) => {
    const loginData = await AuthService.login(req.body);
    if (loginData.status_code === 200) {
      const token = jwt.sign({id: loginData.user.id}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
      });
      req.session.token = token;
    }
    return {
      statusCode: loginData.status_code,
      body: {
        data: {
          "message": loginData.message
        }
      }
    };
  } ,
    /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  register: async (req, res) => {
    const registerData = await AuthService.register(req.body);
    return {
      statusCode: registerData.status_code,
      body: {
        data: {
          "message": registerData.message,
        }
      }
    };
  }
};

export default AuthController;
