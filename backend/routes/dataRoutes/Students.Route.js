const express = require("express");
const router = express.Router();
const { allStudents, getStudent, updateStudent, deleteAllStudents, deleteStudent } = require("../../controller/dataController/studentDataController");

router.get("/", allStudents);
router.get("/:studentId", getStudent);
router.patch("/:studentId", updateStudent);
router.delete("/all", deleteAllStudents);
router.delete("/:studentId", deleteStudent);

module.exports = router;
