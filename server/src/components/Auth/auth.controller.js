import AuthService from "./auth.service";
import {sendEmailValidation} from "../../utils/node-mailer";

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const loginData = await AuthService.login(httpRequest.body);
    return {
      statusCode: 200,
      body: {
        data: loginData
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
