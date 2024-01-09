const express = require("express");
const router = express.Router();
const {getCourseAttendance, getStudentAttendance, markAttendance, allAttendance} = require("../../controller/dataController/attendanceDataController");

router.get("/", allAttendance);
router.get("/student/:studentId", getStudentAttendance);
router.get("/course/:courseId", getCourseAttendance);
router.post("/mark", markAttendance);

module.exports = router;
