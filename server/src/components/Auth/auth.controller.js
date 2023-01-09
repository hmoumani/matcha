import AuthService from "./auth.service";
import {sendEmailValidation, sendResetPasswordEmail} from "../../utils/node-mailer";
import jwt from "jsonwebtoken";
import config from "./auth.config";
import helper from "../../utils/helper";
import HttpStatusCode from "../../enums/HttpStatusCode";

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (req, res) => {
    try{
      const userId = await AuthService.login(req.body);
      const token = jwt.sign({id: userId}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
      });
      req.session.token = token;
      return helper.ControllerResponse(HttpStatusCode.OK, "User logged in successfully!");
    } catch (error) {
      return helper.ControllerResponse(HttpStatusCode.BAD_REQUEST, error.message);
    }
  } ,
  logout: async (req, res) => {
    req.session = null;
    return helper.ControllerResponse(HttpStatusCode.OK, "You've been signed out!");
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
      return helper.ControllerResponse(HttpStatusCode.OK, "User registered successfully!");
    } catch (error) {
      return helper.ControllerResponse(HttpStatusCode.BAD_REQUEST, "Unable to register user");
    }
  },
  verifyEmail: async (req, res) => {
    try{
      await AuthService.verifyEmail(req.body);
      return helper.ControllerResponse(HttpStatusCode.OK, "Email verified successfully!");
    } catch (error) {
      return helper.ControllerResponse(HttpStatusCode.BAD_REQUEST, "Unable to verify email");
    }
  },
  resetPasswordEmail: async (req, res) => {
    try{
      const userId = await AuthService.getUserIdByEmail(req.body.email);
      await sendResetPasswordEmail(req.body.email, userId);
      return helper.ControllerResponse(HttpStatusCode.OK, "Email sent successfully!");
    } catch (error) {
      return helper.ControllerResponse(HttpStatusCode.BAD_REQUEST, "Unable to send email to reset password");

    }
  },
  resetPassword: async (req, res) => {
    try{
      await AuthService.resetPassword(req.body);
      return helper.ControllerResponse(HttpStatusCode.OK, "password updated successfully!");
    } catch (error) {
      return helper.ControllerResponse(HttpStatusCode.BAD_REQUEST, "Unable to reset password");
    }
  },
};

export default AuthController;
