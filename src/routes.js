import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
// layouts
import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "./Schema/User";
// import Layout from "./Layout/LayoutOld";
import Layout from "./Layout/Layout";
//Page
import Dashboard from "./Pages/Dashboard";
import Employee from "./Pages/Employee";
import Attendance from "./Pages/Attendance";
import Office from "./Pages/Office";
import Departement from "./Pages/Departement";
import Payroll from "./Pages/Payroll";
import User from "./Pages/User";
import Login from "./Pages/Login";
import Report from "./Pages/Report";
import Shift from "./Pages/Shift";
import Setting from "./Pages/Setting";
import Project from "./Pages/Project";
// import Task from "./Pages/Task";
//components
import { AuthContext } from "./context/AuthContext";
import OfficeDetails from "./Component/Offices/OfficeDetails";
import DetailEmployee from "./Component/Employee/DetailEmployee";
import EmployeeUpdate from "./Component/Employee/EmployeeUpdate";
import UpdatePersonalInfo from "./Component/Employee/UpdatePersonalInfo";
import OfficeDepartment from "./Component/Departement/OfficeDepartment";
import PublicHoliday from "./Component/SystemSetting/PublicHoliday";
import TypeOfTimeOff from "./Component/SystemSetting/TypeOfTimeOff";
import BranchNameLocation from "./Component/SystemSetting/BranchNameLocation";
import Position from "./Component/Position/Position";
import ForgotPassword from "./Pages/ForgotPassword";
import Page404 from "./Pages/Page404";

// import Purchase from './Component/Attendance/Purchase';

export default function Router({ prefersDarkMode, setPrefersDarkMode }) {
  //
  const { data, refetch } = useQuery(GET_USER_LOGIN, {
    onCompleted: ({ getUserLogin }) => {
      window.localStorage.setItem("userLogin", JSON.stringify(getUserLogin));
    },
  });
  // check Route ==========================================================================
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("users"))
  );

  React.useEffect(() => {
    let userStorage = JSON.parse(window.localStorage.getItem("users"));
    if (userStorage) {
      setUser(userStorage);
      return;
    }

    if (state?.user) {
      setTimeout(() => {
        setUser(state?.user?.email);
        window.localStorage.setItem(
          "users",
          JSON.stringify(state?.user?.email)
        );
      }, 1200);
    } else {
      setUser(null);
    }
  }, [state?.user]);
  // End check Route ==========================================================================

  const LoginPage = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "forgotpassword", element: <ForgotPassword /> },
    { path: "*", element: <Login /> },
  ]);

  const Content = useRoutes([
    {
      path: "/",
      element: <Layout to="/dashboard" />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "dashboard", element: <Dashboard /> },

        { path: "/employee", element: <Employee /> },
        { path: "/employee/updateemployee", element: <EmployeeUpdate /> },
        { path: "/employee/employeedetail", element: <DetailEmployee /> },
        { path: "/employee/updatepersonal", element: <UpdatePersonalInfo /> },

        { path: "/attendance", element: <Attendance /> },
        { path: "/office", element: <Office /> },
        { path: "/office/detailoffice", element: <OfficeDetails /> },

        { path: "/departement", element: <Departement /> },
        {
          path: "/departement/officedepartment",
          element: <OfficeDepartment />,
        },
        {
          path: "/departement/position",
          element: <Position />,
        },

        { path: "/shift", element: <Shift /> },
        { path: "/project", element: <Project /> },
        // { path: "/task", element: <Task /> },
        { path: "/payroll", element: <Payroll /> },
        { path: "/user", element: <User /> },

        { path: "/system-setting", element: <Setting /> },
        { path: "/system-setting/public-holiday", element: <PublicHoliday /> },
        { path: "/system-setting/typeof-timeoff", element: <TypeOfTimeOff /> },
        {
          path: "/system-setting/branch-location",
          element: <BranchNameLocation />,
        },

        { path: "/resport", element: <Report /> },
        { path: "*", element: <Page404 /> },
      ],
    },
  ]);

  if (user !== undefined && user !== null) {
    return Content;
  } else {
    return LoginPage;
  }
}
