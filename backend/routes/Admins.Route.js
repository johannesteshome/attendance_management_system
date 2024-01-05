const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await AdminModel.findById(id);

    if (!admin) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req, 'request');
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
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/all", async (req, res) => {
  try {
    await AdminModel.deleteMany();
    res.status(200).send("All admins deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;
  console.log("here, password route");

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
    return res.send("Password Information is Sent through Email");
  });
});

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
