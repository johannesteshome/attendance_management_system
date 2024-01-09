const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true },
  creditHour: { type: Number, required: true },
  assignment: [
    {
      teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teachers" },
      students: [
        {
          department: { type: mongoose.Schema.Types.ObjectId, ref: "departments" },
          section: [{ type: String }],
        },
      ],
    },
  ],
});

const CourseModel = mongoose.model("courses", courseSchema);

module.exports = {CourseModel};
