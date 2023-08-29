import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config()

// Mail sending function || функция отправки письма
export const sendMail = async (email: string, mailSubject: string, content: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });
    const option = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: mailSubject,
      html: content,
    };

    transporter.sendMail(option, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("mail sent successfully", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

