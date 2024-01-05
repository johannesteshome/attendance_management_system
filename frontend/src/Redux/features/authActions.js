import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const url = "http://localhost:5000";

export const TeacherLogin = createAsyncThunk(
    'teachers/login', async (data, { rejectWithValue }) => {
        try {
            console.log("what about here");
            const response = await axios.post(`${url}/teachers/login`, data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const StudentLogin = createAsyncThunk(
    'students/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/students/login`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const AdminLogin = createAsyncThunk(
    'admin/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/login`, data);
            return response;
        } catch (error) {
            console.log(error, "error");
            return rejectWithValue(error.message);
        }
    }
)

export const TeacherRegister = createAsyncThunk(
  "teachers/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/teachers/register`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const StudentRegister = createAsyncThunk(
    'students/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/students/register`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const AdminRegister = createAsyncThunk(
    'admin/register', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/register`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const UpdateAdmin = createAsyncThunk(
    'student/update', async (data, id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${url}/admin/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const UpdateTeacher = createAsyncThunk(
    'teacher/update', async (data, id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${url}/teachers/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const UpdateStudent = createAsyncThunk(
    'student/update', async (data, id, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${url}/students/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const SendPassword = createAsyncThunk(
    'password/reset', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/password`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'password/forget', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/forgot`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const authLogout = createAction("user/logout");