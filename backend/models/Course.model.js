const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true },
  creditHour: { type: Number, required: true },
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "teachers" }],
});

const CourseModel = mongoose.model("courses", courseSchema);

module.exports = {CourseModel};
