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
  isAuthenticated: false,
  loading: false,
  token: null,
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
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(TeacherLogin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(authLogout, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      .addCase(AdminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
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
        state.token = action.payload.token;
      })
      .addCase(StudentLogin.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
