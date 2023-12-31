const { AdminModel } = require("../../models/Admin.model");
const { TokenModel } = require("../../models/Token.model");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../../utils/");
const { TeacherModel } = require("../../models/Teacher.model");
const { StudentModel } = require("../../models/Student.model");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const teacherExists = await TeacherModel.findOne({ email });
    const inStudent = await StudentModel.findOne({ email });
    const inAdmin = await AdminModel.findOne({ email });
    if (teacherExists) {
      return res.send({
        message: "Teacher already exists",
      });
    }

    if (inStudent || inAdmin) {
      return res.send({
        message: "Person already registerd as Student or Admin",
      });
    }

    const verificationToken = crypto.randomBytes(40).toString("hex");

    const teacher = await TeacherModel.create({
      email,
      password,
      name,
      verificationToken,
    });

    await sendVerificationEmail({ name, email, verificationToken });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message:
        "Teacher created successfully. Please check your email for verification",
    });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide email and password" });
  }

  const teacher = await TeacherModel.findOne({ email });

  if (!teacher) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No Such User" });
  }

  const isPasswordCorrect = await teacher.comparePassword(password);

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Password is Incorrect" });
  }

  if (!teacher.isVerified) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please verify your email first" });
  }

  const tokenUser = createTokenUser(teacher);

  let refreshToken = "";

  const existingToken = await TokenModel.findOne({ user: teacher._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid token" });
    }

    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: teacher._id };

  await TokenModel.create(userToken);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const teacher = await TeacherModel.findOne({ email });

  if (!teacher) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Verification Failed" });
  }

  if (teacher.verificationToken !== verificationToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Verification Failed" });
  }

  teacher.isVerified = true;
  teacher.verified = Date.now();
  teacher.verificationToken = "";

  await teacher.save();

  res.status(StatusCodes.OK).json({ success: true, message: "Email verified" });
};

const logout = async (req, res) => {
  await TokenModel.findOneAndDelete({ user: req.user._id });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide valid email" });
  }

  const teacher = await TeacherModel.findOne({ email });

  if (teacher) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendResetPasswordEmail({
      name: teacher.name,
      email: teacher.email,
      token: passwordToken,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    teacher.passwordToken = passwordToken;
    teacher.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await teacher.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all fields" });
  }

  const teacher = await TeacherModel.findOne({ email });

  if (teacher) {
    const currentDate = new Date();

    if (
      teacher.passwordToken === token &&
      teacher.passwordTokenExpirationDate > currentDate
    ) {
      teacher.password = password;
      teacher.passwordToken = null;
      teacher.passwordTokenExpirationDate = null;
      await teacher.save();
    }
  }

  res.send("reset password");
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
};
