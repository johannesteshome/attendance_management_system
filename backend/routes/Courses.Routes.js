// Import necessary modules
const express = require("express");
const router = express.Router();
const CourseModel = require("../models/Course.model"); // Adjust the path as needed
const TeacherModel = require("../models/Teacher.model"); // Adjust the path as needed

// Route to get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await CourseModel.find().populate("teacher", "teacherName"); // Populate the 'teacher' field with the teacher's name
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Route to get a specific course by ID
router.get("/:id", getCourse, (req, res) => {
  res.json(res.course);
});

// Route to create a new course
router.post("/add", async (req, res) => {
  const { courseCode } = req.body;

  try {
    // Check if the teacher exists
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
});

// Route to update a course by ID
router.patch("/:courseId", async (req, res) => {
  const id = req.params.courseId;
  const payload = req.body;

  try {
    await CourseModel.findByIdAndUpdate({ _id: id }, payload);
    const course = await CourseModel.findById(id);
    if (!course){
    return res
        .status(404)
        .send({ message: `Course with id ${id} not found` });
    }
    res.status(200).send({ message: `Doctor Updated`, user: course });
  } catch (error) {
    res.status(400).send({ error: "Something went wrong. Unable to update" });
  }
});

router.delete("/all", async (req, res) => {
  try {
    await CourseModel.deleteMany();
    res.status(200).send("All courses deleted");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Server Error");
  }
});

// Route to delete a course by ID
router.delete("/:courseId", async (req, res) => {
  // console.log("here");
  const id = req.params.courseId;
  try {
    const course = await CourseModel.findByIdAndDelete({ _id: id });
    if (!course) {
      res.status(404).send({ msg: `Course with id ${id} not found` });
    }
    res.status(200).send(`Course with id ${id} deleted`);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Middleware to get a specific course by ID
async function getCourse(req, res, next) {
  let course;

  try {
    course = await CourseModel.findById(req.params.id).populate(
      "teacher",
      "teacherName"
    ); // Populate the 'teacher' field with the teacher's name
    if (course == null) {
      return res.status(404).send({ message: "Course not found" });
    }
    // res.status(200).send(course);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }

  res.course = course;
  next();
}

// Export the router
module.exports = router;
