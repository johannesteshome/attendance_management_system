import React, { useState } from "react";
import "./CSS/Add_Doctor.css";
import student from "../../../../../img/student-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  StudentRegister,
  SendPassword,
} from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);


const AddStudent = () => {
    const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    // console.log(data);


  const initData = {
    studentName: "",
    studentID: "",
    class: "",
    email: "",
    password: Date.now(),
    age: "",
    mobile: "",
    gender: "",
  };
  const [StudentValue, setStudentValue] = useState(initData);

  const HandleStudentChange = (e) => {
    setStudentValue({ ...StudentValue, [e.target.name]: e.target.value });
  };

  const HandleStudentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(StudentRegister(StudentValue)).then((res) => {
      // console.log(res);
      if (res.message === "Student already exists") {
        setLoading(false);
        return notify("Student Already Exist");
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
      console.log(data, "STUDENT REGISTER SUCCESSFULLY");
      dispatch(SendPassword(data)).then((res) =>
        notify("Account Details Sent")
      );
      setLoading(false);
      setStudentValue(initData);
    });
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
              <h1>Add Students</h1>
              <img
                src={student}
                alt='student-avatar'
                className='avatarimg'
              />
              <form onSubmit={HandleStudentSubmit}>
                <div>
                  <label>Student Name</label>
                  <div className='inputdiv'>
                    <input
                      type='text'
                      placeholder='Full Name'
                      name='studentName'
                      value={StudentValue.studentName}
                      onChange={HandleStudentChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Student ID</label>
                  <div className='inputdiv'>
                    <input
                      type='text'
                      placeholder='Student ID'
                      name='studentID'
                      value={StudentValue.studentID}
                      onChange={HandleStudentChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Class</label>
                  <div className='inputdiv'>
                    <input
                      type='text'
                      placeholder='Class'
                      name='class'
                      value={StudentValue.class}
                      onChange={HandleStudentChange}
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
                      value={StudentValue.age}
                      onChange={HandleStudentChange}
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
                      value={StudentValue.mobile}
                      onChange={HandleStudentChange}
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
                      value={StudentValue.email}
                      onChange={HandleStudentChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Gender</label>
                  <div className='inputdiv'>
                    <select
                      name='gender'
                      value={StudentValue.gender}
                      onChange={HandleStudentChange}
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
    
export default AddStudent;
