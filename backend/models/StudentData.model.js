const mongoose = require("mongoose");

const studentDataSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
  studentID: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  department: {
    // refer the department model
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
  },
  year: {
    type: Number,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
});

const StudentDataModel = mongoose.model("studentsData", studentDataSchema);

module.exports = { StudentDataModel };
