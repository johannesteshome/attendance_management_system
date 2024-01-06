import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import DashboardScreen from "../Screens/DashboardScreen";

import DashboardPage from "../Pages/DashboardPage"
import TeachersPage from "../Pages/TeachersPage"
import StudentsPage from "../Pages/StudentsPage"
import AdminsPage from "../Pages/AdminsPage"
import CoursesPage from "../Pages/CoursesPage";
import LogsPage from "../Pages/LogsPage";
import AddTeacher from "../Pages/AddTeacher";
import AddStudent from "../Pages/AddStudent";
import AddAdmin from "../Pages/AddAdmin";
import NotFoundPage from "../Pages/NotFoundPage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={<LoginScreen />}
        />
        <Route
          path='/'
          element={<LoginScreen />}
        />
        <Route
          path='dashboard'
          element={<DashboardScreen />}>
          <Route
            index
            element={<DashboardPage />}
          />
          <Route
            path='dashboard-page'
            element={<DashboardPage />}
          />
          <Route
            path='teachers-page'
            element={<TeachersPage />}
          />
          <Route
            path='students-page'
            element={<StudentsPage />}
          />
          <Route
            path='admins-page'
            element={<AdminsPage />}
          />
          <Route
            path='courses-page'
            element={<CoursesPage />}
          />
          <Route
            path='logs-page'
            element={<LogsPage />}
          />
          <Route
            path='add-teacher'
            element={<AddTeacher />}
          />
          <Route
            path='add-student'
            element={<AddStudent />}
          />
          <Route
            path='add-admin'
            element={<AddAdmin />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
