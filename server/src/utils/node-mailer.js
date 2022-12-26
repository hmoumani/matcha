import nodemailer from 'nodemailer';

let sendMail = async (mailData) => {

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
export default sendMail;