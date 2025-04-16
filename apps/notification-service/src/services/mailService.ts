import { transporter } from '../config/mailConfig';

export const sendMail = async (to: string, subject: string, html: string) => {
  const info = await transporter.sendMail({
    from: `"Quiz App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  console.log('Message sent:', info.messageId);
};
