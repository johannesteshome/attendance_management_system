const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const nodemailerConfig = require("../../utils/nodemailerConfig")

const router = express.Router();





const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req);
  try {
    const admin = await AdminModel.findOne({ email });
    console.log(admin);
    if (admin) {
      return res.send({
        message: "Admin already exists",
      });
    }
    let value = new AdminModel(req.body);
    console.log(value);
    await value.save();
    const data = await AdminModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req, "request");
  try {
    const admin = await AdminModel.findOne({ email });
    // console.log(admin);
    const validPassword = await bcrypt.compare(password, admin.password);

    if (admin && validPassword) {
      const token = admin.generateAuthToken();
      res
        .cookie("token", token, { httpOnly: true })
        .send({ message: "Successful", user: admin, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
};





// router.post("/password", (req, res) => {
//   const { email, userId, password } = req.body;
//   console.log("here, password route");

  
// });

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  if (type == "admin") {
    user = await AdminModel.find({ email });
    userId = user[0]?.adminID;
    password = user[0]?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "johnrobitm@gmail.com",
      pass: "yyqg lcom uwjz psqa",
    },
  });

  const mailOptions = {
    from: "johnrobitm@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(error);
    }
    return res.send("Password reset email sent");
  });
});

module.exports = router;
