const { StatusCodes } = require("http-status-codes");
const TeacherModel = require("../../models/Teacher.model");


const allTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(StatusCodes.OK).send(teachers);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong" });
  }
};

const getTeacher = async (req, res) => {
    const id = req.params.teacherId;

  try {
    const teacher = await TeacherModel.findById(id);

    if (!teacher) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "User not found" });
    }

    res.status(StatusCodes.OK).send(teacher);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const updateTeacher = async (req, res) => {
  const id = req.params.teacherId;
  const payload = req.body;
  try {
    const teacher = await TeacherModel.findByIdAndUpdate({ _id: id }, payload);
    if (!teacher) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `teacher with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`teacher with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Update." });
  }
};

const deleteAllTeachers = async (req, res) => {
  try {
    await TeacherModel.deleteMany();
    res.status(StatusCodes.OK).send("All teachers deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteTeacher = async (req, res) => {
  const id = req.params.teacherId;
  try {
    const teacher = await TeacherModel.findByIdAndDelete({ _id: id });
    if (!teacher) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `teacher with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`teacher with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Delete." });
  }
};

module.exports = {
  allTeachers,
  getTeacher,
  updateTeacher,
  deleteAllTeachers,
  deleteTeacher,
};
