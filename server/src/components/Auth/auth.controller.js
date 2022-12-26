import AuthService from "./auth.service";
import sendMail from "../../utils/node-mailer";

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
    const registerData = await AuthService.register(req.body);
    const mailData = {
      from: process.env.EMAIL,  // sender address
      to: req.body.email,   // list of receivers
      subject: 'matcha email verification',
      text: 'That was easy!',
      html: '<b>Hey there! </b><br> :v <br/>',
    };
    try{
      await sendMail(mailData);
    } catch (error) {
      return {
        statusCode: 406,
        body: {
          data: {
            "message": error,
          }
        }
      };
    }
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
