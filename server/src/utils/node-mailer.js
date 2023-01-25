import nodemailer from 'nodemailer';
import app from '../app';
import crypto from 'crypto';
import { query } from '../db/index.js';

const sendEmailValidation = async (emailTo, userId) => {
  const token = crypto.randomBytes(64).toString('hex');
  const { EMAIL, FRONTEND_URL } = process.env;
  let mailData = {
    from: EMAIL, // sender address
    to: emailTo, // list of receivers
    subject: 'matcha email verification',
    text:
      'please validate your email by clicking the flowing link : ' +
      'link' +
      '. If you did not request this, then there is no further action you need to take.'
  };
  const link = `${FRONTEND_URL}/VerifyEmail/${token}`;
  app.render(
    'emailtemplate',
    { email: emailTo, link, sentence: 'verify your address', sentence1: 'VERIFY EMAIL' },
    async function (err, html) {
      mailData.html = html;
      await sendMail(mailData);
    }
  );
  await query('insert into validation_tokens(user_id, token, token_type) values ($1, $2, $3)', [
    userId,
    token,
    'email'
  ]);
};

const sendResetPasswordEmail = async (emailTo, userId) => {
  const token = crypto.randomBytes(64).toString('hex');
  const { EMAIL, FRONTEND_URL } = process.env;
  let mailData = {
    from: EMAIL, // sender address
    to: emailTo, // list of receivers
    subject: 'matcha reset password',
    text:
      'please reset your password by clicking the flowing link : ' +
      'link' +
      '. If you did not request this, then there is no further action you need to take.'
  };
  const link = `${FRONTEND_URL}/ResetPassword/${token}`;
  app.render(
    'emailtemplate',
    { email: emailTo, link, sentence: 'Reset your password', sentence1: 'RESET PASSWORD' },
    async function (err, html) {
      mailData.html = html;
      await sendMail(mailData);
    }
  );
  await query('insert into validation_tokens(user_id, token, token_type) values ($1, $2, $3)', [
    userId,
    token,
    'password'
  ]);
};

const sendMail = async (mailData) => {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    secure: true,
    authentication: 'plain'
  });
  try {
    await transporter.sendMail(mailData);
  } catch (error) {
    throw error;
  }
};
export { sendMail, sendEmailValidation, sendResetPasswordEmail };
