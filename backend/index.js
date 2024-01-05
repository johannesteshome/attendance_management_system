const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const adminAuthRouter = require("./routes/authRoutes/AdminsAuth.Route");
const teacherRouter = require("./routes/Teachers.Route");
const studentRouter = require("./routes/Students.Route");
const courseRouter = require("./routes/Courses.Routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/admin/auth", adminAuthRouter);
app.use("/teachers/auth", teacherRouter);
app.use("/students/auth", studentRouter);
app.use("/courses", courseRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
    console.log(error);
  }
  console.log(`Listening at port ${process.env.port}`);
});
