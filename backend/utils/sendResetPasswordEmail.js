const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
//   const resetLink = `${origin}/user/reset-password?token=${token}&email=${email}`;
//   const message = `<p>Please reset password by clicking on the following link: <a href="${resetLink}">Reset Password</a></p>`;
  console.log(email);
  return sendEmail({
    email,
    subject: "Reset Password",
    text: `<h4>Hello ${name}, </h4>`,
  });
};

module.exports = sendResetPasswordEmail;
