const nodemailer = require("nodemailer");
const nodemailerConfig = require("../utils/nodemailerConfig");

const sendEmail = async ({ email, subject, text }) => {
    let testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport(nodemailerConfig);

  const mailOptions = {
    from: "johnrobitm@gmail.com",
    to: email,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
