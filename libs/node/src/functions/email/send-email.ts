import { createTransport, getTestMessageUrl } from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

export interface SendEmailConfig {
  from: string;
  html: string;
  subject: string; 
  to: string;
}

export async function sendEmail(config: SendEmailConfig): Promise<SMTPTransport.SentMessageInfo> {
  const port = 587;
  const transporter = createTransport({
    auth: {
      pass: '',
      user: ''
    },
    host: 'smtp.ethereal.email',
    port,
    secure: false
  });

  const info = await transporter.sendMail(config);
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${getTestMessageUrl(info)}`);

  return info;
}
