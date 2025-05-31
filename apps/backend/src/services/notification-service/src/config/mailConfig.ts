import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
  host: process.env.NOTIFICATION_SERVICE_SMTP_HOST,
  port: Number(process.env.NOTIFICATION_SERVICE_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.NOTIFICATION_SERVICE_SMTP_USER,
    pass: process.env.NOTIFICATION_SERVICE_SMTP_PASS,
  },
});
