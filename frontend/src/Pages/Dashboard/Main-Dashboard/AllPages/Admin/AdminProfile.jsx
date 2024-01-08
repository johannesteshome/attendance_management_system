import React, { useEffect, useState } from "react";
import "../Doctor/CSS/Doctor_Profile.css";
import { AiFillEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsGenderAmbiguous } from "react-icons/bs";
import { CiMobile4 } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateAdmin } from "../../../../../Redux/features/authActions";
// import { GetAdminDetails } from "../../../../../Redux/Datas/action";
import { Navigate } from "react-router-dom";
import "./CSS/Doctor_Profile.css";

// *********************************************************
const AdminProfile = () => {
    const { data } = useSelector((store) => store.auth);
    // console.log(data, "data profile");

    const disptach = useDispatch();
    let currentAdminData = useSelector((store) => store.data.data);
    const [adminData, setAdminData] = useState({});
    const [formData, setFormData] = useState({});
    // disptach(GetAdminDetails(data.user._id));


    // console.log(formData, "formdata");
    console.log(currentAdminData, "currAdmin");

    useEffect(() => {
        console.log("first useEffect, where did this go");
      // disptach(GetAdminDetails(data.user._id));
    }, [disptach]);

    useEffect(() => {
        console.log("second useEffect");
        if(currentAdminData){
            setAdminData(currentAdminData)
        }
    }, [currentAdminData])

    useEffect(() => {
        console.log("third useEffect");
        
        setFormData({
            adminID: adminData.adminID,
            adminName: adminData.adminName,
            email: adminData.email,
            gender: adminData.gender,
            mobile: adminData.mobile || "",
            image: adminData.image,
            age: adminData.age || "",
        }); 
        
    }, [currentAdminData]);

    // console.log(adminData.adminName, "adminData");

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleFormSubmit = () => {
        console.log(formData, "formdata");
        console.log("before dispatch", currentAdminData);
        disptach(UpdateAdmin(formData, data.user._id));
        console.log("after dispatch", currentAdminData);
        
    success("user updated");
    handleOk();
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      {contextHolder}
      <div className='container'>
        <Sidebar />
        <div className='AfterSideBar'>
          <div className='maindoctorProfile'>
            <div className='firstBox'>
              <div>
                <img
                  src={adminData?.image}
                  alt='Admin Image'
                />
              </div>
              <hr />
              <div className='singleitemdiv'>
                <CgProfile className='singledivicons' />
                <p>{adminData?.adminName}</p>
              </div>
              <div className='singleitemdiv'>
                <MdOutlineMailOutline className='singledivicons' />
                <p>{adminData?.email}</p>
              </div>
              <div className='singleitemdiv'>
                <BsGenderAmbiguous className='singledivicons' />
                <p>{adminData?.gender}</p>
              </div>
              <div className='singleitemdiv'>
                <CiMobile4 className='singledivicons' />
                <p>{adminData?.mobile || "-"}</p>
              </div>
              <div className='singleitemdiv'>
                <LiaBirthdayCakeSolid className='singledivicons' />
                <p>{adminData?.age || "-"}</p>
              </div>
              <div className='singleitemdiv'>
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit profile
                </button>
              </div>

              <Modal
                title='Edit details'
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button
                    key='back'
                    onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button
                    key='submit'
                    onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}>
                <form className='inputForm'>
                  <input
                    name='adminName'
                    value={formData.adminName}
                    onChange={handleFormChange}
                    type='text'
                    placeholder='Full name'
                  />
                  <input
                    name='age'
                    value={formData.age}
                    onChange={handleFormChange}
                    type='number'
                    placeholder='Age'
                  />
                  <select
                    name='gender'
                    onChange={handleFormChange}>
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                  <input
                    name='mobile'
                    value={formData.mobile}
                    onChange={handleFormChange}
                    type='number'
                    placeholder='mobile'
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            {/* <div className='SecondBox'>
              <div className='subfirstbox'>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className='singleitemdiv'>
                  <BsGenderAmbiguous className='singledivicons' />
                  <p>{data?.user?.gender}</p>
                </div>
                <div className='singleitemdiv'>
                  <AiFillCalendar className='singledivicons' />
                  <p>{data?.user?.age}</p>
                </div>

                <div className='singleitemdiv'>
                  <MdOutlineCastForEducation className='singledivicons' />
                  <p>{data?.user?.education}</p>
                </div>
                <div className='singleitemdiv'>
                  <BsHouseFill className='singledivicons' />
                  <p>{data?.user?.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              {/* <div className='subSecondBox'>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Hospital Details
                </h2>
                <div className='singleitemdiv'>
                  <BiTime className='singledivicons' />
                  <p>09:00 AM - 20:00 PM (TIMING)</p>
                </div>
                <div className='singleitemdiv'>
                  <FaRegHospital className='singledivicons' />
                  <p>Apollo hospitals</p>
                </div>
                <div className='singleitemdiv'>
                  <FaMapMarkedAlt className='singledivicons' />
                  <p>
                    Sri Aurobindo Marg, Ansari Nagar, Ansari Nagar East, New
                    Delhi.
                  </p>
                </div>
              </div>
            </div>  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
