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
} from "./authActions";

const initialState = {
  isAuthenticated: localStorage.getItem("userInfo") ? true : false,
  loading: false,
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
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
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(TeacherLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(authLogout, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("userInfo");
      })
      .addCase(AdminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(AdminLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StudentLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(StudentLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(StudentLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
