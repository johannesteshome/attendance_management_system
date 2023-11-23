import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import admin from "../../../../../img/admin.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const notify = (text) => toast(text);

const Add_Admin = () => {
  const { data } = useSelector((store) => store.auth);

  const [loading, setloading] = useState(false);


  const InitData = {
    adminName: "",
    age: "",
    mobile: "",
    email: "",
    gender: "",
    adminID: Date.now(),
    password: Date.now(),
  };
  const [AdminValue, setAdminValue] = useState(InitData);

  const HandleAdminChange = (e) => {
    setAdminValue({ ...AdminValue, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const HandleAdminSubmit = (e) => {
    // TODO: This is not working for duplicate admin
    e.preventDefault();
    setloading(true);
    console.log(AdminValue, "adminvalues");
    dispatch(AdminRegister(AdminValue)).then((res) => {
      console.log(res, "clientresponse");
      if (res.message === "Admin already exists") {
        setloading(false);
        return notify("Admin Already Exist");
      }
      if (res.message === "error") {
        setloading(false);
        return notify("Something went wrong, Please try Again");
      }
      notify("Admin Added");

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.adminID,
      };
      dispatch(SendPassword(data)).then((res) => notify("Account Details Sent"));
      setloading(false);
      setAdminValue(InitData);
    });
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Admin</h1>
            <img src={admin} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleAdminSubmit}>
              <div>
                <label>Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="adminName"
                    value={AdminValue.adminName}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={AdminValue.age}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Contact Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Contact Number"
                    name="mobile"
                    value={AdminValue.mobile}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="name@mail.com"
                    name="email"
                    value={AdminValue.email}
                    onChange={HandleAdminChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="gender"
                    value={AdminValue.gender}
                    onChange={HandleAdminChange}
                    required
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Admin;
