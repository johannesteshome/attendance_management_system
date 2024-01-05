import React from "react";
import { Route, Routes } from "react-router-dom";
import DLogin from "../Pages/Dashboard/Dashboard-Login/DLogin";

import FrontPage from "../Pages/Dashboard/Main-Dashboard/GlobalFiles/FrontPage";
import AddTeacher from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddTeacher";
import AddStudent from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddStudent";
import AddCourse from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AddCourse";
import AdminProfile from "../Pages/Dashboard/Main-Dashboard/AllPages/Admin/AdminProfile";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<DLogin />}
        />
        <Route
          path='/dashboard'
          element={<FrontPage />}
        />
        ******************** Teacher Part *************************
        <Route
          path='/addteacher'
          element={<AddTeacher />}
        />
        <Route
          path='/addstudent'
          element={<AddStudent />}
        />
        <Route
          path='/addcourse'
          element={<AddCourse />}
        />
        <Route
          path='/adminprofile'
          element={<AdminProfile />}
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
