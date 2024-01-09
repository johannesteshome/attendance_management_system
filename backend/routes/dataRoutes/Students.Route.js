const express = require("express");
const router = express.Router();
const { allStudents, getStudent, updateStudent, deleteAllStudents, deleteStudent } = require("../../controller/dataController/studentDataController");
const { authenticateUser, authorizePermissions } = require("../../middlewares/authentication");

router.get("/", authenticateUser, allStudents);
router.get("/:studentId", authenticateUser, getStudent);
router.patch("/:studentId", authenticateUser, updateStudent);
router.delete("/all", authenticateUser, authorizePermissions("admin"), deleteAllStudents);
router.delete("/:studentId", authenticateUser, authorizePermissions("admin"), deleteStudent);

module.exports = router;
