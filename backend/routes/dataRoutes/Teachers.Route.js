const express = require("express");
const router = express.Router();
const { allTeachers, getTeacher, updateTeacher, deleteAllTeachers, deleteTeacher } = require("../../controller/dataController/teacherDataController");

router.get("/", allTeachers);
router.get("/:teacherId", getTeacher);
router.patch("/:teacherId", updateTeacher);
router.delete("/all", deleteAllTeachers);
router.delete("/:teacherId", deleteTeacher);

module.exports = router;
