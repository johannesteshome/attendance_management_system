// Import necessary modules
const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendance"); // Adjust the path as needed
const Student = require("../models/student"); // Adjust the path as needed
const Course = require("../models/course"); // Adjust the path as needed

// Route to get all attendance records
router.get("/", async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get attendance records for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendances = await Attendance.find({ student: studentId });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get attendance records for a specific course
router.get("/course/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attendances = await Attendance.find({ course: courseId });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to mark attendance for a student in a course
router.post("/mark", async (req, res) => {
  const { studentId, courseId, isPresent } = req.body;

  try {
    // Check if the student and course exist
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }

    const newAttendance = new Attendance({
      student: studentId,
      course: courseId,
      isPresent,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
