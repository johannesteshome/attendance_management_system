const {AttendanceModel} = require("../../models/Attendance.model");
const {CourseModel} = require("../../models/Course.model");
const { DepartmentModel } = require("../../models/Department.model");
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
    const attendances = await AttendanceModel.find({}, { 'student.studentID': studentId });
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

  const { students, departmentID, courseID, section, year } = req.body;
  try {
    const courseExists = await CourseModel.findById(courseID);
    console.log(students);

    if (!courseExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course not found" });
    }

    for (student of students) {
      const studentExists = await StudentModel.findById(student.studentID);

      if (!studentExists) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Student not found" });
      }
    }

    const departmentExists = await DepartmentModel.findById(departmentID);

    if (!departmentExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Department not found" });
    }

    // create the attendance record
    const newAttendance = new AttendanceModel({
      students,
      courseID,
      section,
      year
    });

    const savedAttendance = await newAttendance.save();
    res.status(StatusCodes.CREATED).json(savedAttendance);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteAttendance = async (req, res) => {

  const attendanceID = req.params.attendanceId;
  try {
    const attendance = await AttendanceModel.findById(attendanceID);
    if (!attendance) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Attendance not found" });
    }
    await attendance.delete();
    res.status(StatusCodes.OK).json("deleted successfully");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

const deleteAllAttendance = async (req, res) => {

  try {
    await AttendanceModel.deleteMany();
    res.status(StatusCodes.OK).json("all attendances deleted successfully");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

module.exports = {
  allAttendance,
  getStudentAttendance,
  getCourseAttendance,
  markAttendance,
  deleteAllAttendance,
  deleteAttendance
};
