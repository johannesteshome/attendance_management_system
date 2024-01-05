const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userType: {
    type: String,
    default: "teacher",
  },
  teacherName: {
    type: String,
    required: true,
  },
  teacherID: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    default: 'Teacher'
  },

  mobile: {
    type: Number,
    minlength: 10,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
