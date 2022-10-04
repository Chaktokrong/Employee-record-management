import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  TableHead,
  Avatar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import "./attendance.scss";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import testAvator from "../Assets/testAvator.svg";
import Divider from "@mui/material/Divider";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import moment from "moment";
// import PrintIcon from '@mui/icons-material/Print';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//date picker
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";

//component
import AttendanceCreate from "../Component/Attendance/AttendanceCreate";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import AttendanceAction from "../Component/Attendance/AttendanceAction";
import { GET_ATTENDANCE_BY_DAY, REMOVE_ATTENDANCE } from "../Schema/Attendance";

export default function Attendance() {
  const navigate = useNavigate();

  const [openDateDesktop, setOpenDateDesktop] = React.useState(false);
  const handleOpenDateDesktop = () => setOpenDateDesktop(true);
  const handleCloseDateDesktop = () => setOpenDateDesktop(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [filterDate, setFilterDate] = useState(new Date());
  const [deleteDate, setDeleteDate] = useState(new Date());

  // console.log("filterDate::", filterDate)
  // console.log("deleteDate::", deleteDate)

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // Date Picker
  const [value, setValue] = React.useState(new Date());
  // get user

  const [getAttendanceByDay, { data, refetch }] = useLazyQuery(
    GET_ATTENDANCE_BY_DAY,
    {
      onCompleted: ({ getAttendanceByDay }) => {
        // console.log("getAttendanceByDay::: ", getAttendanceByDay);
        // setRowdata(getAttendanceByDay);
      },
      onError: (error) => {
        console.log(error?.message);
      },
    }
  );

  // console.log("filterDate::", moment(filterDate).format("YYYY-MM-DD"))

  // Delete
  const [removeAttendanceByDay] = useMutation(REMOVE_ATTENDANCE, {
    onCompleted: ({ removeAttendanceByDay }) => {
      if (removeAttendanceByDay?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(removeAttendanceByDay?.message);
        refetch();
      } else {
        setOpenError(true);
        setErrorMessage(removeAttendanceByDay?.message);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleDelete = () => {
    removeAttendanceByDay({
      variables: {
        day: deleteDate,
      },
    });
  };

  // console.log("rowData::", rowData)

  return (
    <div className="attendance-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Attendance</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right" spacing={2}>
          <Box className="text-field">
            <Box width="80%">
              <Box className="date-filter-respon-desktop">
                <LocalizationProvider
                  className="date-controll"
                  dateAdapter={AdapterDateFns}
                >
                  <DatePicker
                    open={openDateDesktop}
                    onOpen={() => setOpenDateDesktop(true)}
                    onClose={() => setOpenDateDesktop(false)}
                    onChange={(e) => {
                      setFilterDate(e);
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        type="date"
                        fullWidth
                        onClick={(e) => setOpenDateDesktop(true)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ mr: 2 }}>
                              <DateRangeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    value={filterDate}
                  />
                </LocalizationProvider>
              </Box>
              <Box className="date-filter-respon-mobile">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    value={filterDate}
                    onChange={(e) => setFilterDate(e)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ mr: 2 }}>
                              <DateRangeIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              paddingRight="10px"
            >
              <IconButton>
                <TuneIcon sx={{ color: "gray" }} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Box className="container">
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead className="header-row">
              <TableRow className="table">
                <TableCell className="header-title">ID</TableCell>
                <TableCell className="header-title" width="20%">
                  Name
                </TableCell>
                <TableCell className="header-title">Department</TableCell>
                <TableCell className="header-title" align="center">
                  Check In
                </TableCell>
                <TableCell className="header-title" align="center">
                  Check Out
                </TableCell>
                <TableCell className="header-title">Attendance</TableCell>
                <TableCell className="header-title">Fine</TableCell>
                <TableCell className="header-title">Reason</TableCell>
              </TableRow>
            </TableHead>

            <TableBody component={Paper} className="body">
              <TableRow className="body-row">
                <TableCell className="body-title-first">00123</TableCell>
                <TableCell className="body-title">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={``} sx={{ width: "40px", height: "40px" }} />
                    <Stack direction="column" justifyContent="center">
                      Long Dara
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell className="body-title">Academic Affairs</TableCell>
                <TableCell className="body-title" align="center">
                  07:00 AM
                </TableCell>
                <TableCell className="body-title" align="center">
                  07:00 AM
                </TableCell>
                <TableCell className="body-title att-Present">
                  Present
                </TableCell>
                <TableCell className="body-title">$0</TableCell>
                <TableCell className="body-title"></TableCell>
                <TableCell className="body-title-last" align="right">
                  <AttendanceAction />
                </TableCell>
              </TableRow>
              <TableRow className="body-row">
                <TableCell className="body-title-first">00123</TableCell>
                <TableCell className="body-title">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={``} sx={{ width: "40px", height: "40px" }} />
                    <Stack direction="column" justifyContent="center">
                      Long Dara
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell className="body-title">Academic Affairs</TableCell>
                <TableCell className="body-title" align="center">
                  ---:---
                </TableCell>
                <TableCell className="body-title" align="center">
                  17:02 PM
                </TableCell>
                <TableCell className="body-title att-Absent">Absent</TableCell>
                <TableCell className="body-title">$1</TableCell>
                <TableCell className="body-title"></TableCell>
                <TableCell className="body-title-last" align="right">
                  <AttendanceAction />
                </TableCell>
              </TableRow>
              <TableRow className="body-row">
                <TableCell className="body-title-first">00123</TableCell>
                <TableCell className="body-title">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={``} sx={{ width: "40px", height: "40px" }} />
                    <Stack direction="column" justifyContent="center">
                      Long Dara
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell className="body-title">Academic Affairs</TableCell>
                <TableCell className="body-title" align="center">
                  ---:---
                </TableCell>
                <TableCell className="body-title" align="center">
                  ---:---
                </TableCell>
                <TableCell className="body-title att-Permission">
                  Permission
                </TableCell>
                <TableCell className="body-title">$0</TableCell>
                <TableCell className="body-title">Sick</TableCell>
                <TableCell className="body-title-last" align="right">
                  <AttendanceAction />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* <Modal open={open}>
        <AttendanceCreate
          setRefetch={refetch}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
          setSuccesstMessage={setSuccesstMessage}
          setErrorMessage={setErrorMessage}
        />
      </Modal> */}

      {/* <Modal open={openDelete} className="modal-delete">
        <Box className="delete-user">
          <Stack direction="row" spacing={5}>
            <Typography className="header-title" variant="h6">
              Delete Attendance
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton onClick={handleCloseDelete}>
              <CloseIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Typography> Please select date to delete! </Typography>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={deleteDate}
                  onChange={(e) => setDeleteDate(e)}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      type="date"
                      {...params}
                      size="small"
                      helperText={null}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth onClick={handleDelete} className="btn-delete">
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal> */}

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
