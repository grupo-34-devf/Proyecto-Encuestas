import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  emailTest: {
    host: process.env.TEST_EMAIL_HOST,
    port: process.env.TEST_EMAIL_PORT,
    auth: {
      user: process.env.TEST_EMAIL_USER,
      pass: process.env.TEST_EMAIL_PASS,
    },
  },
};

if (process.env.NODE_ENV === "development") {
  console.log(config);
}

export default config;
