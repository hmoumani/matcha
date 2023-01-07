import AuthService from "./auth.service";
import {sendEmailValidation} from "../../utils/node-mailer";
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
  logout: async (req, res) => {
    req.session = null;
    return {
      statusCode: 200,
      body: {
        data: {
          "message": "You've been signed out!"
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
    try{
      const results = await AuthService.register(req.body);
      await sendEmailValidation(req.body.email, results.registredUserId);
      return {
        statusCode: 200,
        body: {
          data: {
            message: "User registered successfully!",
          }
        }
      };
    } catch (error) {
      return {
        statusCode: 406,
        body: {
          data: {
            message: "Unable to register user",
          }
        }
      };
    }
  },
  verifyEmail: async (req, res) => {
    try{
      await AuthService.verifyEmail(req.body);
    } catch (error) {
      return {
        statusCode: 406,
        body: {
          data: {
            message: "Unable to verify email",
          }
        }
      };
    }
    return {
      statusCode: 200,
      body: {
        data: {
          message: "Email verified successfully!",
        }
      }
    };
  }
};

export default AuthController;
