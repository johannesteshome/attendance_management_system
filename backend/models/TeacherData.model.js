const mongoose = require("mongoose");

const teacherDataSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const TeacherDataModel = mongoose.model("teachersData", teacherDataSchema);

module.exports = { TeacherDataModel };
