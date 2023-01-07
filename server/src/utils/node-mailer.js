import nodemailer from 'nodemailer';
import app from "../app"
import crypto from "crypto"
import {query} from "../db/index.js"

const sendEmailValidation = async (emailTo, userId) => {
    const token = crypto.randomBytes(64).toString('hex');
    console.log(token);
    let mailData = {
        from: process.env.EMAIL,  // sender address
        to: emailTo,   // list of receivers
        subject: 'matcha email verification',
        text: 'please validate your email by clicking the flowing link : ' + "link" + '. If you did not request this, then there is no further action you need to take.',
    };
    app.render('emailtemplate', { email: emailTo, link: "google.com" }, async function (err, html){
        mailData.html = html;
        await sendMail(mailData);
    });
    await query("insert into validation_tokens(user_id, token, token_type) values ($1, $2, $3)", [userId, token, "email"]);
}

const sendMail = async (mailData) => {
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
                },
        secure: true,
        authentication: 'plain'
    });
    try{
        await transporter.sendMail(mailData);
    } catch (error) {
        throw error;
    }
}
export {sendMail, sendEmailValidation};