import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./createshift.scss";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Grid,
  FormHelperText,
  Autocomplete,
  IconButton,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/client";
import Switch from "@mui/material/Switch";
//date picker
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { FaPencilAlt } from "react-icons/fa";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//components
import DeleteShift from "./DeleteShift";
import DetailsShiftMobile from "./ShiftDetailsMobile";
import { UPDATE_SHIFT } from "../../Schema/Shift";
import { GET_TYPE_OF_TIMEOFF } from "../../Schema/Setting";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ShiftDetails({
  data,
  setState,
  anchor,
  toggleDrawer,
  open,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  //
  const { noneUserAccesse } = useContext(AuthContext);

  const [allDay, setAllDay] = useState(false);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [endTime, setEndTime] = useState(dayjs(new Date()));

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //get type off time off
  const [typeOfTimeOff, setTypeOfTimeOff] = useState([]);
  const [typeOfTimeOffSelected, setTypeOfTimeOffSelected] = useState({
    id: data?.type_of_timeoff?._id,
    label: data?.type_of_timeoff?.type_name,
  });
  const {
    data: typeOfTimeOffData,
    loading,
    error,
  } = useQuery(GET_TYPE_OF_TIMEOFF, {
    onCompleted: ({ getTypeOfTimeOff }) => {
      // console.log("getTypeOfTimeOff>>>>", getTypeOfTimeOff);
      setTypeOfTimeOff(getTypeOfTimeOff);
    },
  });

  console.log("data>>>>", data);

  useEffect(() => {
    if (data) {
      setAllDay(data?.all_day);
      setStartDate(data?.start_date);
      setEndDate(data?.end_date);
      setTypeOfTimeOffSelected({
        id: data?.type_of_timeoff?._id,
        label: data?.type_of_timeoff?.type_name,
      });
      setFieldValue("type_of_timeoff", data?.type_of_timeoff?._id);
      setFieldValue("reason", data?.reason);
      setFieldValue("request_type", data?.request_type);
      setFieldValue("status", data?.status);
    }
  }, [data]);

  useEffect(() => {
    if (data?.start_time === null && data?.end_time === null) {
      setStartTime(dayjs(new Date()));
      setEndTime(dayjs(new Date()));
    } else {
      setStartTime(data?.start_time);
      setEndTime(data?.end_time);
    }
  }, [data?.start_time, data?.end_time]);

  // console.log("startTime>>>>", startTime, endTime);

  const typeOfTimeOffOptions =
    typeOfTimeOff?.map((e, index) => ({
      id: e?._id,
      label: e?.type_name,
    })) || [];

  const handleTypeOfTimeOff = (event, newValue) => {
    setFieldValue("type_of_timeoff", newValue.id);
    setTypeOfTimeOffSelected(newValue);
  };

  let userLoginData = JSON.parse(localStorage.getItem("userLogin"));
  // console.log("userLoginData::", userLoginData);

  const [updateShift] = useMutation(UPDATE_SHIFT, {
    onCompleted: ({ updateShift }) => {
      // console.log("updateShift>>>", updateShift);
      if (updateShift?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateShift?.message);
        setRefetch();
        setState({ right: false });
      } else {
        setOpenError(true);
        setErrorMessage(updateShift?.message);
      }
    },
    oneError: ({ error }) => {
      console.log(error.massage);
    },
  });

  //formik
  const AddRequest = Yup.object().shape({
    request_type: Yup.string().required("Field is require!"),
    type_of_timeoff: Yup.string().required("Field is require!"),
    reason: Yup.string().required("Field is require!"),
  });

  const formik = useFormik({
    initialValues: {
      request_type: "Time off",
      type_of_timeoff: "",
      reason: "",
    },
    validationSchema: AddRequest,
    onSubmit: (values) => {
      let newRequest = {
        request_type: values?.request_type,
        all_day: allDay,
        type_of_timeoff: values?.type_of_timeoff,
        start_date: startDate,
        end_date: endDate,
        start_time: allDay === true ? null : startTime,
        end_time: allDay === true ? null : endTime,
        reason: values?.reason,
        status: values?.status,
        status_date: null,
        reply: {
          text: "",
          character: null,
        },
        created_by: userLoginData?._id,
        approved_by: null,
      };
      // console.log("newRequest::>>>", newRequest);
      updateShift({
        variables: {
          id: data?._id,
          input: {
            ...newRequest,
          },
        },
      });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  let responsiveWeb = { xs: "none", sm: "block" };
  let responsiveMobile = { xs: "block", sm: "none" };

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onOpen={toggleDrawer(anchor, true)}
      // onClose={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 500,
          display: responsiveMobile,
        }}
        role="presentation"
        // onKeyDown={toggleDrawer(anchor, false)}
        className="create-shift-mobile"
      >
        <DetailsShiftMobile
          data={data}
          anchor={anchor}
          open={open}
          setState={setState}
          toggleDrawer={toggleDrawer}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
          setSuccesstMessage={setSuccesstMessage}
          setErrorMessage={setErrorMessage}
        />
      </Box>
      <Box
        sx={{
          width: anchor === "top" || anchor === "bottom" ? "auto" : 500,
          display: responsiveWeb,
        }}
        role="presentation"
        // onKeyDown={toggleDrawer(anchor, false)}
        className="create-shift"
      >
        <Stack direction="column" className="box-form">
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <Grid item container spacing={3}>
                <Grid item xs={6}>
                  <Stack direction="row" className="stack-header">
                    <Typography className="title">Employee Request</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" className="stack-delete">
                    <IconButton
                      className="delete-icon"
                      onClick={handleOpenDelete}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                    <DeleteShift
                      shiftId={data?._id}
                      open={openDelete}
                      handleClose={handleCloseDelete}
                      setState={setState}
                      setRefetch={setRefetch}
                      setOpenSuccess={setOpenSuccess}
                      setOpenError={setOpenError}
                      setSuccesstMessage={setSuccesstMessage}
                      setErrorMessage={setErrorMessage}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row">
                      <DoNotDisturbAltIcon className="icons" />
                      <Typography className="header-body">
                        Choose Request
                      </Typography>
                    </Stack>
                    <FormControl size="small">
                      <Select
                        {...getFieldProps("request_type")}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        error={Boolean(
                          touched.request_type && errors.request_type
                        )}
                      >
                        <MenuItem value="Time off">Time off</MenuItem>
                        <MenuItem value="Over time">Over time</MenuItem>
                      </Select>
                    </FormControl>
                    {!!errors.request_type && (
                      <FormHelperText error id="outlined-adornment-password">
                        {errors.request_type}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row">
                      <CalendarTodayIcon className="icons" />
                      <Typography className="header-body">
                        Type of time off
                      </Typography>
                    </Stack>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={typeOfTimeOffOptions}
                      value={typeOfTimeOffSelected}
                      onChange={handleTypeOfTimeOff}
                      getOptionSelected={(option, value) =>
                        option?.id === value?.id
                      }
                      getOptionLabel={(option) =>
                        option?.label ? option?.label : "type of time off"
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="type of time off"
                          error={Boolean(
                            touched.type_of_timeoff && errors.type_of_timeoff
                          )}
                          helperText={
                            touched.type_of_timeoff && errors.type_of_timeoff
                          }
                        />
                      )}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <Stack direction="row" sx={{ marginTop: "6px" }}>
                    <AccessTimeIcon className="icons" />
                    <Stack direction="row" alignItems="center">
                      <Typography className="header-body">All Day</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Switch
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
                <Grid item xs={4}></Grid>

                {allDay === true ? (
                  <>
                    <Grid item xs={6}>
                      <Typography className="header-body">
                        Start date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // fullWidth
                              size="small"
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="header-body">End date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={6}>
                      <Typography className="header-body">
                        Start date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="header-body">
                        Start time
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileTimePicker
                          value={startTime}
                          onChange={(newValue) => {
                            setStartTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="header-body">End date</Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="header-body">End time</Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileTimePicker
                          value={endTime}
                          onChange={(newValue) => {
                            setEndTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row">
                      <FaPencilAlt className="icons-reason" />
                      <Typography className="header-body">Reason</Typography>
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      {...getFieldProps("reason")}
                      className="textfield-reason"
                      placeholder="Write your reason here,"
                      error={Boolean(touched.reason && errors.reason)}
                      helperText={touched.reason && errors.reason}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row">
                      <FaPencilAlt className="icons-reason" />
                      <Typography className="header-body">Message</Typography>
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      // {...getFieldProps("reason")}
                      className="textfield-reason"
                      placeholder="Leave your message here,"
                      // error={Boolean(touched.reason && errors.reason)}
                      // helperText={touched.reason && errors.reason}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
          <Box sx={{ flexGrow: 1 }} />
          <Box className="box-action">
            <Stack direction="row" spacing={10}>
              <Button
                className="btn-cencel"
                onClick={toggleDrawer(anchor, false)}
              >
                Cencel
              </Button>
              <Button className="btn-add" onClick={handleSubmit}>
                Update
              </Button>
            </Stack>

            {/* <Stack direction="row" spacing={10}>
              <Button
                className="btn-cencel"
                onClick={toggleDrawer(anchor, false)}
              >
                Reject
              </Button>
              <Button className="btn-add">Approve</Button>
            </Stack> */}
          </Box>
        </Stack>
      </Box>
    </SwipeableDrawer>
  );
}
