import { createSlice } from "@reduxjs/toolkit";
import { FetchAllDepartments } from "./dataActions";

const initialState = {
  departments: null,
  loading: false
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
      });
  }
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
