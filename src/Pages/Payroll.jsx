import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  Paper,
  Modal,
  TableHead,
  Avatar,
  TextField,
  InputAdornment,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import "./payroll.scss";
import { useQuery, useMutation } from "@apollo/client/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import testAvator from "../Assets/testAvator.svg";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useNavigate } from "react-router-dom";
// Alert message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
// components
import {
  GET_PAYROLL_BY_MONTH,
  CREATE_PAYROLL_BY_MONTH,
} from "../Schema/Payroll";
import SalaryAction from "../Component/Salary/SalaryAction";
import CreateSalary from "../Component/Salary/CreateSalary";
import moment from "moment";

export default function Salary() {
  const navigate = useNavigate();

  const [payrollData, setPayrollData] = useState([]);
  const [payrollList, setPayrollList] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { data, refetch } = useQuery(GET_PAYROLL_BY_MONTH, {
    variables: {
      annual: parseInt(moment(filterDate).format("YYYY")),
      monthly: parseInt(moment(filterDate).format("M")),
    },
    onCompleted: ({ getPayrollReview }) => {
      setPayrollData(getPayrollReview);
      //   console.log("getPayrollReview::", getPayrollReview);
    },
  });

  const [createSalary] = useMutation(CREATE_PAYROLL_BY_MONTH, {
    onCompleted: ({ createSalary }) => {
      console.log("createSalary::", createSalary);
      if (createSalary?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createSalary?.message);
        refetch();
      } else {
        setOpenError(true);
        setErrorMessage(createSalary?.message);
      }
    },
    oneError: ({ error }) => {
      console.log(error.massage);
    },
  });

  console.log("payrollList::", payrollList);

  useEffect(() => {
    if (payrollData?.length !== 0) {
      let rows = [];
      payrollData?.map((e) => {
        const allRow = {
          emp_id: e?.emp_id,
          emp_name: e?.emp_name,
          emp_image: e?.emp_image,
          salary: e?.salary,
          work_day: e?.work_day,
          ot: e?.ot !== null ? e?.ot : 2,
          bonus: e?.bonus !== null ? e?.bonus : 2,
          total_salary: e?.total_salary,
        };
        rows.push(allRow);
      });
      setPayrollList(rows);
    }
  }, [payrollData]);

  const handleSubmit = () => {
    createSalary({
      variables: {
        annual: parseInt(moment(filterDate).format("YYYY")),
        monthly: parseInt(moment(filterDate).format("M")),
        data: payrollList,
      },
    });
  };

  return (
    <div className="payroll-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Payroll</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} justifyContent="right">
          <Box className="box-date">
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="box-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year", "month"]}
                value={filterDate}
                onChange={(newValue) => {
                  setFilterDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={null}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
        <Stack direction="row" spacing={5} className="btn-add">
          <Button
            onClick={handleSubmit}
            endIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add">Create</Typography>
          </Button>
          {/* <Modal open={open}>
            <CreateSalary
              // handleClose={handleClose}
              // setRefetch={refetch}
              handleClose={handleClose}
              open={open}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          </Modal> */}
        </Stack>
      </Stack>

      <Box className="container">
        <TableContainer>
          <Table
            sx={{ minWidth: 450 }}
            className="table-container"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-title" width="5%">
                  N°
                </TableCell>
                <TableCell className="header-title" width="22%">
                  Employee Name
                </TableCell>
                <TableCell className="header-title" width="15%">
                  Base salary
                </TableCell>
                <TableCell className="header-title" width="16%">
                  Working Day
                </TableCell>
                <TableCell className="header-title" width="14%">
                  Bonus
                </TableCell>
                <TableCell className="header-title" width="12%">
                  OT
                </TableCell>
                <TableCell className="header-title" width="20%">
                  Last Salary
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="body">
              {payrollData?.map((row, index) => {
                return (
                  <TableRow className="body-row" key={row?.emp_id}>
                    <TableCell className="body-title" width="5%">
                      {index + 1} -
                    </TableCell>
                    <TableCell className="body-title" width="22%">
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{ width: "40px", height: "40px" }}
                          src={row?.emp_image}
                        />
                        <Stack direction="column" justifyContent="center">
                          {row?.emp_name}
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell className="body-title" width="15%">
                      {row?.salary}
                    </TableCell>
                    <TableCell className="body-title" width="16%">
                      {row?.work_day}
                    </TableCell>
                    <TableCell className="body-title" width="14%">
                      {row?.bonus}
                    </TableCell>
                    <TableCell className="body-title" width="12%">
                      {row?.ot} h
                    </TableCell>
                    <TableCell className="body-title" width="20%">
                      {row?.total_salary} $
                    </TableCell>
                    <TableCell className="body-title" align="right" width="20%">
                      <SalaryAction
                        // row={row}
                        // setRefetch={refetch}
                        setOpenSuccess={setOpenSuccess}
                        setOpenError={setOpenError}
                        setSuccesstMessage={setSuccesstMessage}
                        setErrorMessage={setErrorMessage}
                        handleClose={handleClose}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
