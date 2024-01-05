const nodemailer = require("nodemailer");
const nodemailerConfig = require("../utils/nodemailerConfig");

const sendEmail = async ({email, subject, text}) => {
    const transporter = nodemailer.createTransport(nodemailerConfig)

    const mailOptions = {
        from: "johnrobitm@gmail.com",
        to: email,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send(error);
        }
        return res.send("Password Information is Sent through Email");
    })

}

module.exports = sendEmail
