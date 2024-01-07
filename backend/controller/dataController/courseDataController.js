const { StatusCodes } = require("http-status-codes");
const CourseModel = require("../../models/Course.model");


const allCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find().populate("teacher", "teacherName");;
    res.status(StatusCodes.OK).send(courses);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong" });
  }
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await CourseModel.findById(id).populate(
      "teacher",
      "teacherName"
    );

    if (!course) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: "Course not found" });
    }

    res.status(StatusCodes.OK).send(course);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const addCourse = async (req, res) => {
  const { courseCode } = req.body;

  try {
    const course = await CourseModel.findOne({ courseCode });
    if (course) {
      return res.send({
        message: "Course already exists",
      });
    }

    let value = new CourseModel(req.body);
    await value.save();
    const data = await CourseModel.findOne({ courseCode });
    return res.send({ data, message: "Course created" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

const updateCourse = async (req, res) => {
  const id = req.params.courseId;
  const payload = req.body;
  try {
    const course = await CourseModel.findByIdAndUpdate({ _id: id }, payload);
    if (!course) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `course with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`course with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Update." });
  }
};

const deleteAllCourses = async (req, res) => {
  try {
    await CourseModel.deleteMany();
    res.status(StatusCodes.OK).send("All courses deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.courseId;
  try {
    const course = await CourseModel.findByIdAndDelete({ _id: id });
    if (!course) {
      res.status(StatusCodes.NOT_FOUND).send({ msg: `course with id ${id} not found` });
    }
    res.status(StatusCodes.OK).send(`course with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Something went wrong, unable to Delete." });
  }
};

module.exports = {
  allCourses,
  getCourse,
  updateCourse,
  addCourse,
  deleteAllCourses,
  deleteCourse,
};
