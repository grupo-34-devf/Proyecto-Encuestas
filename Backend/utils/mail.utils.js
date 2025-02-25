import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false,
  auth: {
    user: "MS_0bbSxN@trial-v69oxl507r2g785k.mlsender.net",
    pass: "mssp.vBRuGgZ.0r83ql3jmwzgzw1j.OXpFX78",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async ({ from, to, subject, html }) => {
  const mailOptions = {
    from: `MS_0bbSxN@trial-v69oxl507r2g785k.mlsender.net`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  };

  await transport.sendMail(mailOptions);
};
