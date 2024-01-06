const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const adminAuthRouter = require("./routes/authRoutes/AdminsAuth.Route");
const teacherAuthRouter = require("./routes/authRoutes/TeacherAuthRoute");
const studentAuthRouter = require("./routes/authRoutes/StudentAuthRoute");
const courseRouter = require("./routes/Courses.Routes");

const app = express();

app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use("/admin/auth", adminAuthRouter);
app.use("/teacher/auth", teacherAuthRouter);
app.use("/student/auth", studentAuthRouter);
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
