import { createSlice } from "@reduxjs/toolkit";
import {
  TeacherLogin,
  AdminLogin,
  StudentLogin,
  TeacherRegister,
  AdminRegister,
  StudentRegister,
  UpdateTeacher,
  UpdateStudent,
  UpdateAdmin,
  authLogout,
  forgetPassword,
  SendPassword,
  TeacherSendOTP,
  StudentSendOTP,
  AdminSendOTP,
  AdminForgetPassword,
  TeacherForgetPassword,
  StudentForgetPassword,
  AdminResetPassword,
  StudentResetPassword,
  TeacherResetPassword,
  AdminVerifyEmail,
  StudentVerifyEmail,
  TeacherVerifyEmail
} from "./authActions";

const initialState = {
  isAuthenticated: false,
  loggedInSession: false,
  loading: false,
  user: null,
};

console.log(initialState, "initialState");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TeacherLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherLogin.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
        state.loggedInSession = true;
      })
      .addCase(TeacherLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(authLogout, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        // localStorage.removeItem("userInfo");
      })
      .addCase(AdminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInSession = true;
      })
      .addCase(AdminLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInSession = true;
      })
      .addCase(StudentLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(TeacherSendOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherSendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loggedInSession = false;
        // localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(TeacherSendOTP.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentSendOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentSendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loggedInSession = false;
        // localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(StudentSendOTP.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AdminSendOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminSendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loggedInSession = false;
        // localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(AdminSendOTP.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AdminForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AdminForgetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(StudentForgetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(TeacherForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(TeacherForgetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AdminResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminResetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AdminResetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentResetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(StudentResetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(TeacherResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherResetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(TeacherResetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AdminVerifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminVerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AdminVerifyEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentVerifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentVerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(StudentVerifyEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(TeacherVerifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherVerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(TeacherVerifyEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(AdminRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminRegister.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AdminRegister.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentRegister.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(StudentRegister.rejected, (state) => {
        state.loading = false;
      })
      .addCase(TeacherRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(TeacherRegister.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(TeacherRegister.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
