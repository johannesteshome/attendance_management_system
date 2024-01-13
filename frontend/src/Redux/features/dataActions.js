import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const url = "http://localhost:5000";

export const FetchLoggedInUserData = createAsyncThunk(
  "data/fetchTeacher",
  async (data, { rejectWithValue }) => {
    try {
      console.log("what about here");
      const response = await axios.post(`${url}/teacher/auth/login`, data);
      console.log(response, "response from redux");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchAllDepartments = createAsyncThunk(
  "data/fetchAllDepartments",
  async (data, { rejectWithValue }) => {
    try {
      console.log("what about here");
      const response = await axios.get(`${url}/departments/`, data);
      console.log(response, "response from redux");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
