const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  section: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "Student"
  },

  age: {
    type: Number,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },
  year: {
    type: Number,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
