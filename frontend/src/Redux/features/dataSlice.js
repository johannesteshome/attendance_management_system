import { createSlice } from "@reduxjs/toolkit";
import { FetchAllDepartments, FetchStudent, FetchTeacher, FetchAdmin, UpdateAdmin, UpdateStudent, UpdateTeacher } from "./dataActions";

const initialState = {
  departments: null,
  loading: false,
  loggedInUser: null
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchAllDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAllDepartments.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(FetchAllDepartments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(FetchAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAdmin.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(FetchAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(FetchStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchStudent.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(FetchStudent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(FetchTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchTeacher.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(FetchTeacher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateAdmin.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
      })
      .addCase(UpdateAdmin.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateStudent.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
      })
      .addCase(UpdateStudent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UpdateTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateTeacher.fulfilled, (state, action) => {
        console.log(action, "slice");
        state.loading = false;
      })
      .addCase(UpdateTeacher.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
