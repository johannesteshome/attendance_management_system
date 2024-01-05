const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
//   const resetLink = `${origin}/user/reset-password?token=${token}&email=${email}`;
//   const message = `<p>Please reset password by clicking on the following link: <a href="${resetLink}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello ${name}, </h4>`,
  });
};

module.exports = sendResetPasswordEmail;
