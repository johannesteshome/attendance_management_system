const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: [{studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  isPresent: { type: Boolean, default: false }}],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  date: { type: Date, default: Date.now },
  section: [{
    type: String,
  }]
});

const AttendanceModel = mongoose.model("attendances", attendanceSchema);

module.exports = {AttendanceModel};
