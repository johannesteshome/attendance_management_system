import React, { useState } from "react";
import { GiNurseFemale } from "react-icons/gi";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHospitalUser } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { LuBook } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: { user },
  } = useSelector((state) => state.auth);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div>
        <div
          style={{ width: isOpen ? "200px" : "70px" }}
          className={`sidebar`}>
          <div className='top_section'>
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className='logo'>
              AASTU AMS
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className='bars'>
              <ImMenu
                onClick={toggle}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className='bottomSection'>
            <Link
              className='link'
              activeclassname='active'
              to={"/dashboard"}>
              <div className='icon'>
                <MdDashboardCustomize className='mainIcon' />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className='link_text'>
                DashBoard
              </div>
            </Link>

            {user?.userType === "nurse" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/patientlist"}>
                <div className='icon'>
                  <FiUsers className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Patients
                </div>
              </Link>
            ) : null}

            {user?.userType === "nurse" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/nurseprofile"}>
                <div className='icon'>
                  <CgProfile className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Profile
                </div>
              </Link>
            ) : null}
            {user?.userType === "nurse" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/addpatient"}>
                <div className='icon'>
                  <FaHospitalUser className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Add Patient
                </div>
              </Link>
            ) : null}

            {user?.userType === "admin" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/addteacher"}>
                <div className='icon'>
                  <FaChalkboardTeacher className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Teachers List
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/addstudent"}>
                <div className='icon'>
                  <PiStudent className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Students List
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/addcourse"}>
                <div className='icon'>
                  <LuBook className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Courses List
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/admin"}>
                <div className='icon'>
                  <RiAdminLine
                    className='mainIcon'
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Admins List
                </div>
              </Link>
            ) : null}

            {/* {user?.userType === "admin" ? (
              <Link
                className="link"
                activeclassname="active"
                to={"/checkpayment"}
              >
                <div className="icon">
                  <RiSecurePaymentLine className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Payments
                </div>
              </Link>
            ) : null} */}

            {user?.userType === "doctor" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/patientlist"}>
                <div className='icon'>
                  <FiUsers className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  My Patients
                </div>
              </Link>
            ) : null}

            {
              /* add this to the admin side */ user?.userType === "doctor" ? (
                <Link
                  className='link'
                  activeclassname='active'
                  to={"/reports"}>
                  <div className='icon'>
                    <TbReportMedical className='mainIcon' />
                  </div>
                  <div
                    style={{ display: isOpen ? "block" : "none" }}
                    className='link_text'>
                    Reports
                  </div>
                </Link>
              ) : null
            }

            {user?.userType === "doctor" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/createslip"}>
                <div className='icon'>
                  <BiDetail className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Create Report
                </div>
              </Link>
            ) : null}
            {user?.userType === "doctor" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/doctorprofile"}>
                <div className='icon'>
                  <CgProfile className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Profile
                </div>
              </Link>
            ) : null}
            {user?.userType === "admin" ? (
              <Link
                className='link'
                activeclassname='active'
                to={"/adminprofile"}>
                <div className='icon'>
                  <CgProfile className='mainIcon' />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className='link_text'>
                  Profile
                </div>
              </Link>
            ) : null}
            {/* {user?.userType === "doctor" ? (
              <Link
                className="link"
                activeclassname="active"
                to={"/patientdetails"}
              >
                <div className="icon">
                  <TbListDetails className="mainIcon" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  Patients
                </div>
              </Link>
            ) : null} */}

            <Link
              className='LogOutPath link'
              onClick={() => {
                dispatch({ type: "AUTH_LOGOUT" });
              }}
              to={"/"}>
              <div className='icon'>
                <FiLogOut />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className='link_text'>
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
