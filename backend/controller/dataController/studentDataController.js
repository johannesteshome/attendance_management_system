const { StatusCodes } = require("http-status-codes");
const {StudentModel} = require("../../models/Student.model");

const allStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(StatusCodes.OK).send(students);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong" });
  }
};

const getStudent = async (req, res) => {
  const id  = req.params.studentId;

  try {
    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
    }

    res.status(StatusCodes.OK).send(student);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.studentId;
  const payload = req.body;
  try {
    const student = await StudentModel.findByIdAndUpdate({ _id: id }, payload);
    if (!student) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `student with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`student with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Update." });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    await StudentModel.deleteMany();
    res.status(StatusCodes.OK).send("All students deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.studentId;
  try {
    const student = await StudentModel.findByIdAndDelete({ _id: id });
    if (!student) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `student with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`student with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Delete." });
  }
};

module.exports = {
  allStudents,
  getStudent,
  updateStudent,
  deleteAllStudents,
  deleteStudent,
};
