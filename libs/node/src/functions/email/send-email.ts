import { createTransport, getTestMessageUrl, createTestAccount } from 'nodemailer';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

export interface SendEmailConfig {
  from: string;
  html: string;
  subject: string; 
  to: string;
  text: string;
}

export async function sendEmail(config: SendEmailConfig): Promise<SMTPTransport.SentMessageInfo> {
  const account = await createTestAccount();

  const transporter = createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const info = await transporter.sendMail(config);
  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview URL: ${getTestMessageUrl(info)}`);

  return info;
}
