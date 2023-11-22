const express = require("express");
const router = express.Router();
const StudentModel = require("../models/Student.model"); 

router.get("/", async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { studentID } = req.body;

  try {
    const student = await StudentModel.findOne({ studentID });
    if (student) {
      return res.send({
        message: "student already exists",
      });
    }
    let value = new StudentModel(req.body);
    await value.save();
    const data = await StudentModel.findOne({ studentID });
    return res.send({ data, message: "student created" });
  } catch (error) {
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { studentID, password } = req.body;
  try {
    const teacher = await StudentModel.findOne({ studentID, password });

    if (teacher) {
      const token = jwt.sign({ foo: "bar" }, process.env.key, {
        expiresIn: "24h",
      });
      res.send({ message: "Successful", user: teacher, token: token });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
  }
});

router.patch("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const payload = req.body;
  try {
    await StudentModel.findByIdAndUpdate({ _id: id }, payload);
    const student = await StudentModel.findById(id);
    if (!student) {
      return res
        .status(404)
        .send({ message: `student with id ${id} not found` });
    }
    res.status(200).send({ message: `student Updated`, user: student });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  try {
    const student = await StudentModel.findByIdAndDelete({ _id: id });
    if (!student) {
      res.status(404).send({ msg: `student with id ${id} not found` });
    }
    res.status(200).send(`student with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
