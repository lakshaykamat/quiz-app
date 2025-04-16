import { Request, Response } from 'express';
import { sendMail } from '../services/mailService';
import { EmailPayload } from '../types/email';

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { email, name } = req.body as EmailPayload;

  // Use the designed HTML template
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Quiz App!</title>
      <style>
          @media only screen and (max-width: 600px) {
              .container {
                  width: 100% !important;
              }
              .header-img {
                  width: 100% !important;
                  height: auto !important;
              }
          }
      </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
          <tr>
              <td align="center" style="padding: 40px 0 30px 0; background-color: #2b3d4f;">
                  <img src="YOUR_LOGO_URL" alt="Quiz App Logo" width="200" style="display: block;" />
              </td>
          </tr>
          
          <tr>
              <td style="padding: 40px 30px;">
                  <h1 style="color: #2b3d4f; margin: 0 0 20px 0;">Welcome to Quiz App, ${name}! 🎉</h1>
                  <p style="color: #525f7f; line-height: 1.6; margin: 0 0 20px 0;">
                      Thanks for joining the ultimate quiz experience! We're excited to have you on board.
                  </p>
                  
                  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                      <h3 style="color: #2b3d4f; margin-top: 0;">Get started:</h3>
                      <ul style="color: #525f7f; line-height: 1.6; padding-left: 20px;">
                          <li>📚 Explore thousands of quizzes</li>
                          <li>🏆 Compete on leaderboards</li>
                          <li>🎯 Create your own quizzes</li>
                          <li>📈 Track your progress</li>
                      </ul>
                  </div>

                  <a href="YOUR_APP_URL" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                      Start Quizzing Now!
                  </a>
              </td>
          </tr>

          <tr>
              <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
                  <p style="color: #8898aa; margin: 0 0 15px 0; font-size: 14px;">
                      Follow us on social media:
                  </p>
                  <div style="margin-bottom: 20px;">
                      <a href="TWITTER_URL" style="margin: 0 10px;"><img src="TWITTER_ICON_URL" alt="Twitter" width="24"></a>
                      <a href="FACEBOOK_URL" style="margin: 0 10px;"><img src="FACEBOOK_ICON_URL" alt="Facebook" width="24"></a>
                      <a href="INSTAGRAM_URL" style="margin: 0 10px;"><img src="INSTAGRAM_ICON_URL" alt="Instagram" width="24"></a>
                  </div>
                  <p style="color: #8898aa; margin: 0; font-size: 12px;">
                      © ${new Date().getFullYear()} Quiz App. All rights reserved.<br>
                      [Company Address]<br>
                      <a href="UNSUBSCRIBE_URL" style="color: #4CAF50; text-decoration: none;">Unsubscribe</a> |
                      <a href="PRIVACY_POLICY_URL" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a>
                  </p>
              </td>
          </tr>
      </table>
  </body>
  </html>`;

  await sendMail(email, 'Welcome to Quiz App!', html);

  res.status(200).json({ message: `Welcome email sent to ${email}` });
};

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const { email, name, verificationLink } = req.body as EmailPayload;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          @media only screen and (max-width: 600px) {
              .container {
                  width: 100% !important;
              }
              .button {
                  width: 100% !important;
              }
          }
      </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
          <tr>
              <td align="center" style="padding: 40px 0 30px 0; background-color: #2b3d4f;">
                  <img src="YOUR_LOGO_URL" alt="Quiz App Logo" width="200" style="display: block;" />
              </td>
          </tr>
          
          <tr>
              <td style="padding: 40px 30px;">
                  <h1 style="color: #2b3d4f; margin: 0 0 25px 0;">Hi ${name},</h1>
                  <p style="color: #525f7f; line-height: 1.6; margin: 0 0 25px 0;">
                      Thanks for signing up! Please verify your email address to activate your account 
                      and start exploring our quizzes.
                  </p>
                  
                  <div style="text-align: center; margin: 40px 0;">
                      <a href="${verificationLink}" 
                         style="background-color: #4CAF50; 
                                color: white; 
                                padding: 16px 32px;
                                text-decoration: none; 
                                border-radius: 5px; 
                                display: inline-block; 
                                font-size: 16px;
                                font-weight: bold;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                transition: background-color 0.3s;">
                          Verify Email Address
                      </a>
                  </div>

                  <p style="color: #525f7f; line-height: 1.6; margin: 20px 0; font-size: 14px;">
                      <strong>Link not working?</strong><br>
                      Copy and paste this URL in your browser:<br>
                      <a href="${verificationLink}" style="color: #4CAF50; word-break: break-all;">
                          ${verificationLink}
                      </a>
                  </p>
              </td>
          </tr>

          <tr>
              <td style="padding: 30px; background-color: #f8f9fa; text-align: center;">
                  <p style="color: #8898aa; margin: 0 0 15px 0; font-size: 14px;">
                      Need help? Contact us at <a href="mailto:support@quizapp.com" style="color: #4CAF50;">support@quizapp.com</a>
                  </p>
                  <p style="color: #8898aa; margin: 0; font-size: 12px;">
                      © ${new Date().getFullYear()} Quiz App. All rights reserved.<br>
                      This email was sent to ${email}<br>
                      <a href="UNSUBSCRIBE_URL" style="color: #4CAF50; text-decoration: none;">Unsubscribe</a> | 
                      <a href="PRIVACY_POLICY_URL" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a>
                  </p>
              </td>
          </tr>
      </table>
  </body>
  </html>`;

  await sendMail(email, 'Verify Your Email', html);

  res.status(200).json({ message: 'Verification email sent!' });
};
