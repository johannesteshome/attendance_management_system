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
        state.loggedInSession = false
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
        state.loggedInSession = false
        // localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(AdminSendOTP.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
