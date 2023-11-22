import { Table } from "antd";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { RiEmpathizeLine } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllData, GetPatients } from "../../../../Redux/Datas/action";

let generator = require("generate-password");



const FrontPage = () => {
  // const columns = [
  //   { title: "Name", dataIndex: "patientName", key: "patientName" },
  //   { title: "Age", dataIndex: "age", key: "age" },
  //   { title: "Disease", dataIndex: "disease", key: "disease" },
  //   { title: "Blood Group", dataIndex: "bloodGroup", key: "bloodGroup" },
  //   { title: "Department", dataIndex: "department", key: "department" },
  //   { title: "Email", dataIndex: "email", key: "email" },
  // ];

  const { patients } = useSelector((store) => store.data.patients);
  const {
    dashboard: { data },
  } = useSelector((store) => store.data);

  console.log(data, 'the data');

  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(GetPatients());
    // dispatch(GetAllData());
    
  }, []);

  return (
    <div className='container'>
      <Sidebar />
      <div className='AfterSideBar'>
        <h1 style={{ color: "rgb(184 191 234)" }}>Overview</h1>
        <div className='maindiv'>
          <div className='one commondiv'>
            <div>
              <h1>{data?.doctor}</h1>
              <p>Doctor</p>
            </div>
            <FaUserDoctor className='overviewIcon' />
          </div>
          <div className='two commondiv'>
            {" "}
            <div>
              <h1>{data?.nurse}</h1>
              <p>Nurse</p>
            </div>
            <FaUserNurse className='overviewIcon' />
          </div>
          <div className='three commondiv'>
            <div>
              <h1>{data?.patient}</h1>
              <p>Patient</p>
            </div>
            <RiEmpathizeLine className='overviewIcon' />
          </div>
          <div className='six commondiv'>
            {" "}
            <div>
              <h1>{data?.admin}</h1>
              <p>Admin</p>
            </div>
            <RiAdminLine className='overviewIcon' />
          </div>

          <div className='six commondiv'>
            {" "}
            <div>
              <h1>{data?.report}</h1>
              <p>Reports</p>
            </div>
            <TbReportMedical className='overviewIcon' />
          </div>
        </div>
        {/* 
        TODO:
        Make this table available for doctors, patients and admins
        ************************************* */}
        {/* <div className='patientDetails'>
          <h1>Patient Details</h1>
          <div className='patientBox'>
            <Table
              columns={columns}
              dataSource={patients}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FrontPage;
