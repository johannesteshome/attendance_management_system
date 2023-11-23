import React, { useState } from "react";
import "./CSS/Add_Doctor.css";
import teacher from "../../../../../img/teacher-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  TeacherRegister,
  SendPassword,
} from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);
// const generator = require("generate-password");

const AddTeacher = () => {
  const { data } = useSelector((store) => store.auth);
  console.log(data, "auth data");

  const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    // console.log(data);


  const initData = {
    teacherName: "",
    teacherID: Date.now(),
    email: "",
    courses: [],
    password: Date.now(),
    age: "",
    mobile: "",
    gender: "",
  };
  const [TeacherValue, setTeacherValue] = useState(initData);

  const HandleTeacherChange = (e) => {
    setTeacherValue({ ...TeacherValue, [e.target.name]: e.target.value });
  };

  const HandleTeacherSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(TeacherRegister(TeacherValue)).then((res) => {
      // console.log(res);
      if (res.message === "Teacher already exists") {
        setLoading(false);
        return notify("Teacher Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.teacherID,
      };
      console.log(data, "TEACHER REGISTER SUCCESSFULLY");
      dispatch(SendPassword(data)).then((res) =>
        notify("Account Details Sent")
      );
      setLoading(false);
      setTeacherValue(initData);
    });
  };

  if (data?.isAuthenticated === false) {
    console.log("here");
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className='container'>
        <Sidebar />
        <div className='AfterSideBar'>
          <div className='Main_Add_Doctor_div'>
            <h1>Add Teachers</h1>
            <img
              src={teacher}
              alt='teacher-avatar'
              className='avatarimg'
            />
            <form onSubmit={HandleTeacherSubmit}>
              <div>
                <label>Teacher Name</label>
                <div className='inputdiv'>
                  <input
                    type='text'
                    placeholder='Full Name'
                    name='teacherName'
                    value={TeacherValue.teacherName}
                    onChange={HandleTeacherChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className='inputdiv'>
                  <input
                    type='number'
                    placeholder='Age'
                    name='age'
                    value={TeacherValue.age}
                    onChange={HandleTeacherChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Contact Number</label>
                <div className='inputdiv'>
                  <input
                    type='number'
                    placeholder='Contact Number'
                    name='mobile'
                    value={TeacherValue.mobile}
                    onChange={HandleTeacherChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className='inputdiv'>
                  <input
                    type='email'
                    placeholder='name@mail.com'
                    name='email'
                    value={TeacherValue.email}
                    onChange={HandleTeacherChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className='inputdiv'>
                  <select
                    name='gender'
                    value={TeacherValue.gender}
                    onChange={HandleTeacherChange}
                    required>
                    <option value='Choose Gender'>Choose Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
              </div>

              <button
                type='submit'
                className='formsubmitbutton'>
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTeacher;
