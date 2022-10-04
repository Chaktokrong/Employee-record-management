import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import "./DetailEmployee.scss";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//Schema
import { GET_EMPLOYEE_BYID } from "../../Schema/Employee";
import { GET_CONTRACT_BY_EMPLOYEEID } from "../../Schema/Contract";
// Alert message
import AlertMessage from "../AlertMessage/AlertMessage";
//components
import EmployeeAttendance from "./EmployeeAttendance";
import EmployeeInformation from "./EmployeeInformation";
import ContractDetails from "./ContractDetails";
import CreateContract from "./CreateContract";

export default function DetailEmployee() {
  //get Storage Room ID by Url
  let navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [employeeId, setEmployeeId] = useState(params.get("id"));
  const [value, setValue] = useState("attendance");

  // console.log("employeeID>>>>", employeeID);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    setEmployeeId(params.get("id"));
    if (params.get("tab")) {
      setValue(params.get("tab"));
    }
  }, [location.search]);
  // const location = useLocation();

  const [viewData, setViewData] = useState([]);
  const { data, refetch } = useQuery(GET_CONTRACT_BY_EMPLOYEEID, {
    variables: {
      getContractByEmployeeIdId: employeeId,
    },
    onCompleted: ({ getContractByEmployeeId }) => {
      console.log(getContractByEmployeeId);
      setViewData(getContractByEmployeeId);
    },
  });

  const [viewInfoData, setViewInfoData] = useState(null);
  const { refetch: refetchInfo } = useQuery(GET_EMPLOYEE_BYID, {
    variables: {
      getEmployeeByIdId: employeeId,
    },
    onCompleted: ({ getEmployeeById }) => {
      // console.log(getEmployeeById);
      setViewInfoData(getEmployeeById);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
    refetchInfo();
  }, [employeeId, location.search]);

  // console.log("viewData::", viewData[0]);

  return (
    <div className="employee-details">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">
            <b
              onClick={() => navigate("/employee")}
              style={{ cursor: "pointer" }}
            >
              Employee{" "}
            </b>
            /{" "}
            {viewInfoData?.latin_name?.last_name +
              " " +
              viewInfoData?.latin_name?.first_name}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          className="btn-addes"
          sx={{
            display: value === "information" ? "block" : "none",
          }}
        >
          <Button
            sx={{ color: "white" }}
            endIcon={<BorderColorIcon />}
            onClick={() =>
              navigate(`/employee/updatepersonal?id=${employeeId}`)
            }
          >
            <Typography className="style-addes" align="center">
              Edit
            </Typography>
          </Button>
        </Stack>
        <Stack
          className="btn-addes"
          sx={{
            display: value === "contract" ? "block" : "none",
          }}
        >
          <Button
            sx={{ color: "white" }}
            endIcon={<AddCircleOutlineIcon />}
            onClick={handleOpen}
          >
            <Typography className="style-addes" align="center">
              Create
            </Typography>
          </Button>
          <CreateContract
            employeeId={employeeId}
            handleClose={handleClose}
            open={open}
            setRefetch={refetch}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
            setSuccesstMessage={setSuccesstMessage}
            setErrorMessage={setErrorMessage}
          />
        </Stack>
      </Stack>

      <Box sx={{ flexGrow: 1 }} className="main-containner">
        <Box className="box-container">
          <Stack direction="row" spacing={4}>
            <Button
              onClick={() => setValue("attendance")}
              className={
                value === "attendance"
                  ? "active-btn-attendance"
                  : "btn-attendance"
              }
            >
              Attendance
            </Button>
            <Button
              onClick={() => setValue("information")}
              className={
                value === "information"
                  ? "active-btn-information"
                  : "btn-information"
              }
            >
              Employee Information
            </Button>
            <Button
              onClick={() => setValue("contract")}
              className={value === "contract" ? "active-btn-work" : "btn-work"}
            >
              Contract
            </Button>

            <Box sx={{ flexGrow: 1 }} />
          </Stack>
        </Box>
        <Box>
          {value === "attendance" ? (
            <EmployeeAttendance status={"attendance"} viewData={viewInfoData} />
          ) : value === "information" ? (
            <EmployeeInformation
              status={"information"}
              viewData={viewInfoData}
            />
          ) : (
            <ContractDetails
              status={"work"}
              viewData={viewData}
              viewInfoData={viewInfoData}
              setRefetch={refetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Box>
      </Box>

      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
}
