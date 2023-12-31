import React, { useEffect, useState } from "react";
import { Radio, Drawer } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import banner from "../img/banner.png";
import admin from "../img/admin.jpg";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminLogin,
  StudentLogin,
  forgetPassword,
  TeacherLogin,
} from "../Redux/features/authActions";

const notify = (text) => toast(text);

const LoginScreen = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [Loading, setLoading] = useState(false);
  const [placement, setPlacement] = useState("Teacher");
  const [formvalue, setFormvalue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const Handlechange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    console.log("here");
    e.preventDefault();
    setLoading(true);
    if (formvalue.email !== "" && formvalue.password !== "") {
      if (placement === "Teacher") {
        let data = {
          ...formvalue,
          email: formvalue.email,
        };
        dispatch(TeacherLogin(data)).then((res) => {
          console.log(res, "res Here");
          if (res.meta.requestStatus === "fulfilled") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }
          if (res.payload.message === "Wrong credentials") {
            setLoading(false);
            notify("Wrong credentials");
          }
          if (res.payload.message === "Error") {
            setLoading(false);
            notify("Something went Wrong, Please Try Again");
          }
        });
      } else if (placement === "Student") {
        let data = {
          ...formvalue,
          email: formvalue.email,
        };
        console.log(data);
        dispatch(StudentLogin(data)).then((res) => {
          if (res.payload.message === "Successful") {
            notify("Login Successful");
            setLoading(false);

            return navigate("/dashboard");
          }
          if (res.payload.message === "Wrong credentials") {
            setLoading(false);

            notify("Wrong credentials");
          }
          if (res.payload.message === "Error") {
            setLoading(false);

            notify("Something went Wrong, Please Try Again");
          }
        });
      } else if (placement === "Admin") {
        let data = {
          ...formvalue,
          email: formvalue.email,
        };
        dispatch(AdminLogin(data)).then((res) => {
          console.log(res);
          if (res.payload.message === "Successful") {
            notify("Login Successful");
            setLoading(false);
            return navigate("/dashboard");
          }
          if (res.payload.message === "Wrong credentials") {
            setLoading(false);

            notify("Wrong credentials");
          }
          if (res.payload.message === "Error") {
            setLoading(false);

            notify("Something went Wrong, Please Try Again");
          }
        });
      }
    }
  };

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  const [ForgetPassword, setForgetPassword] = useState({
    type: "",
    email: "",
  });

  const HandleForgetPassword = (e) => {
    setForgetPassword({ ...ForgetPassword, [e.target.name]: e.target.value });
  };

  const [forgetLoading, setforgetLoading] = useState(false);

  const HandleChangePassword = () => {
    if (ForgetPassword.type === "") {
      return notify("Please Fill all Details");
    }
    setforgetLoading(true);
    dispatch(forgetPassword(ForgetPassword)).then((res) => {
      if (res.message === "User not found") {
        setforgetLoading(false);
        return notify("User Not Found");
      }
      setForgetPassword({
        type: "",
        email: "",
      });
      onClose();
      setforgetLoading(false);
      return notify("Account Details Send");
    });
  };

  return (
    <>
      <ToastContainer />

      <div className='mainLoginPage'>
        <div className='leftside'>
          <img
            src={banner}
            alt='banner'
          />
        </div>
        <div className='rightside'>
          <h1>Login</h1>
          <div>
            <Radio.Group
              value={placement}
              onChange={placementChange}
              className={"radiogroup"}>
              <Radio.Button
                value='Teacher'
                className={"radiobutton"}>
                Teacher
              </Radio.Button>
              <Radio.Button
                value='Student'
                className={"radiobutton"}>
                Student
              </Radio.Button>
              <Radio.Button
                value='Admin'
                className={"radiobutton"}>
                Admin
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className='Profileimg'>
            <img
              src={admin}
              alt='profile'
            />
          </div>
          <div>
            <form onSubmit={HandleSubmit}>
              <h3>{placement} Email:</h3>
              <input
                type='email'
                name='email'
                value={formvalue.email}
                onChange={Handlechange}
                required
              />
              <h3>Password</h3>
              <input
                type='password'
                name='password'
                value={formvalue.password}
                onChange={Handlechange}
                required
              />
              <button type='submit'>{Loading ? "Loading..." : "Submit"}</button>
              <p style={{ marginTop: "10px" }}>
                Forget Password?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={showDrawer}>
                  Get it on Email !
                </span>
              </p>

              {/* Forgot Password Drawer */}
              <Drawer
                title='Forget Password'
                placement='left'
                onClose={onClose}
                open={open}>
                <div>
                  <label style={{ fontSize: "18px" }}>Choose Type</label>

                  <select
                    name='type'
                    value={ForgetPassword.type}
                    onChange={HandleForgetPassword}
                    required>
                    <option value=''>User Type</option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Student'>Student</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "18px" }}>
                    Enter Email
                  </label>
                  <input
                    type='email'
                    placeholder='example@mail.com'
                    name='email'
                    value={ForgetPassword.email}
                    onChange={HandleForgetPassword}
                    required
                    style={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#bce0fb",
                      fontSize: "18px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                    }}
                  />
                </div>

                <button
                  style={{
                    width: "50%",
                    margin: " 20px auto",
                    display: "flex",
                    padding: "10px",
                    fontSize: "18px",
                    backgroundColor: "#ff9f9f",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    justifyContent: "center",
                  }}
                  onClick={HandleChangePassword}>
                  {forgetLoading ? "Loading..." : " Send Mail"}
                </button>
              </Drawer>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
