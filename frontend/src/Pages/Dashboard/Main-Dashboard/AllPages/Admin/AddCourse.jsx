import React, { useState } from "react";
import "./CSS/Add_Doctor.css";
import course from "../../../../../img/course-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCourse
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);
// const generator = require("generate-password");

const AddCourse = () => {
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // console.log(data);

  const initData = {
    courseTitle: "",
    courseCode: "",
    courseID: Date.now(),
    creditHour: "",
  };
  const [CourseValue, setCourseValue] = useState(initData);

  const HandleCourseChange = (e) => {
    setCourseValue({ ...CourseValue, [e.target.name]: e.target.value });
  };

  const HandleCourseSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(CreateCourse(CourseValue))
    setLoading(false)
  };

  if (data?.isAuthticated === false) {
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
            <h1>Add Course</h1>
            <img
              src={course}
              alt='course-avatar'
              className='avatarimg'
            />
            <form onSubmit={HandleCourseSubmit}>
              <div>
                <label>Course Title</label>
                <div className='inputdiv'>
                  <input
                    type='text'
                    placeholder='Course Title'
                    name='courseTitle'
                    value={CourseValue.courseTitle}
                    onChange={HandleCourseChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Course Code</label>
                <div className='inputdiv'>
                  <input
                    type='text'
                    placeholder='Course Code'
                    name='courseCode'
                    value={CourseValue.courseCode}
                    onChange={HandleCourseChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Credit Hour</label>
                <div className='inputdiv'>
                  <input
                    type='number'
                    placeholder='Credit Hour'
                    name='creditHour'
                    value={CourseValue.creditHour}
                    onChange={HandleCourseChange}
                    required
                  />
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
export default AddCourse;
