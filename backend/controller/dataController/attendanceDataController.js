const AttendanceModel = require("../../models/Attendance.model");
const CourseModel = require("../../models/Course.model");
const { StudentModel } = require("../../models/Student.model");
const {StatusCodes} = require("http-status-codes");

// Route to get all attendance records
const allAttendance = async (req, res) => {
  try {
    const attendances = await AttendanceModel.find();
    res.json(attendances);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Route to get attendance records for a specific student
const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const attendances = await AttendanceModel.find({ student: studentId });
    res.json(attendances);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Route to get attendance records for a specific course
const getCourseAttendance = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attendances = await AttendanceModel.find({ course: courseId });
    res.json(attendances);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

// Route to mark attendance for a student in a course
const markAttendance = async (req, res) => {
  const { studentId, courseId, isPresent } = req.body;

  try {
    // Check if the student and course exist
    const student = await StudentModel.findById(studentId);
    const course = await CourseModel.findById(courseId);

    if (!student || !course) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Student or course not found" });
    }

    const newAttendance = new Attendance({
      student: studentId,
      course: courseId,
      isPresent,
    });

    const savedAttendance = await newAttendance.save();
    res.status(StatusCodes.CREATED).json(savedAttendance);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  allAttendance,
  getStudentAttendance,
  getCourseAttendance,
  markAttendance,
};
