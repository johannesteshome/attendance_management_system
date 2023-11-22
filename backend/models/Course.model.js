const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseID: { type: Number, required: true },
    creditHour: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

const Course = mongoose.model("Subject", courseSchema);

module.exports = Course;
