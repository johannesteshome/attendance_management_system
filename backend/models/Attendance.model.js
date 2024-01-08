const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: { type: Date, default: Date.now },
  isPresent: { type: Boolean, default: false },
  section: {
    type: String,
  }
  // Other attendance attributes as needed
});

const AttendanceModel = mongoose.model("attendances", attendanceSchema);

module.exports = {AttendanceModel};
