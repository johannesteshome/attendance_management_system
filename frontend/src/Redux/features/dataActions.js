import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const url = "http://localhost:5000";

export const FetchAllDepartments = createAsyncThunk(
  "data/fetchAllDepartments",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/departments/`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchTeacher = createAsyncThunk(
  "data/fetchTeacher",
  async (data, id, { rejectWithValue }) => {
    try {
      console.log("what about here");
      const response = await axios.get(`${url}/teachers/${id}`, data);
      console.log(response, "response from redux");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchStudent = createAsyncThunk(
  "data/fetchStudent",
  async (data, id, { rejectWithValue }) => {
    try {
      console.log(id, "what about here");
      const response = await axios.get(`${url}/students/${id}`, data);
      console.log(response, "response from redux");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchAdmin = createAsyncThunk(
  "data/fetchAdmin",
  async (_id, { rejectWithValue }) => {
    try {
      console.log("what about here", _id);
      const response = await axios.get(`${url}/admins/${_id}`);
      console.log(response, "response from redux");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateAdmin = createAsyncThunk(
  "data/updateAdmin",
  async (data, { rejectWithValue }) => {
    const {_id} = data
    try {
      const response = await axios.patch(`${url}/admins/${_id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateTeacher = createAsyncThunk(
  "data/updateTeacher",
  async (data, { rejectWithValue }) => {
    const {_id} = data
  try {
      const response = await axios.patch(`${url}/teachers/${_id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateStudent = createAsyncThunk(
  "data/updateStudent",
  async (data, { rejectWithValue }) => {
    const {_id} = data
    try {
      const response = await axios.patch(`${url}/students/${_id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
