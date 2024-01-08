const sendEmail = require("./sendEmail.js")

const sendVerificationEmail = async({name, email}) => {
    const subject = "Email Verification"
    const text = `Hello ${name}, please verify your email by clicking on the link below:`
    return sendEmail({email, subject, text})
}

module.exports = sendVerificationEmail