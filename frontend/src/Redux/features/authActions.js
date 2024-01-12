import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const url = "http://localhost:5000";

export const TeacherLogin = createAsyncThunk(
    'teacher/auth/login', async (data, { rejectWithValue }) => {
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
)

export const StudentLogin = createAsyncThunk(
    'students/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/student/auth/login`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const AdminLogin = createAsyncThunk(
    'admin/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/auth/login`, data);
            return response;
        } catch (error) {
            console.log(error, "error");
            return rejectWithValue(error.message);
        }
    }
)

export const AdminSendOTP = createAsyncThunk(
    'admin/sendOTP', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/admin/auth/login-otp`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const TeacherSendOTP = createAsyncThunk(
  "teacher/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${url}/teacher/auth/login-otp`, data);
        console.log(response.data, 'response from redux in otp');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const StudentSendOTP = createAsyncThunk(
  "student/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/student/auth/login-otp`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const StudentForgetPassword = createAsyncThunk(
  "student/forget-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/student/auth/forgot-password`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const TeacherForgetPassword = createAsyncThunk(
  "teacher/forget-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/teacher/auth/forgot-password`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AdminForgetPassword = createAsyncThunk(
  "admin/forget-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/admin/auth/forgot-password`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const StudentResetPassword = createAsyncThunk(
  "student/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/student/auth/reset-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const TeacherResetPassword = createAsyncThunk(
  "teacher/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/teacher/auth/reset-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AdminResetPassword = createAsyncThunk(
  "admin/reset-password",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${url}/admin/auth/reset-password`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLogout = createAction("user/logout");

export const TeacherRegister = createAsyncThunk(
  "teachers/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/teacher/register`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const StudentRegister = createAsyncThunk(
    'students/login', async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/student/register`, data);
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

