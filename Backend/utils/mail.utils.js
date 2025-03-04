import nodemailer from "nodemailer";
import config from "../config.js";

const transportConfig =
  process.env.NODE_ENV === "test" ? config.emailTest : config.email;

const transport = nodemailer.createTransport(transportConfig);

export const sendMail = async ({ from, to, subject, html }) => {
  const mailOptions = {
    from: config.email.auth.user, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  };

  await transport.sendMail(mailOptions);
};
