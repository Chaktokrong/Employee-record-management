import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./createshiftmobile.scss";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Grid,
  FormHelperText,
  Autocomplete,
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
import { FaPencilAlt } from "react-icons/fa";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//components
import { CREATE_SHIFT } from "../../Schema/Shift";
import { GET_TYPE_OF_TIMEOFF } from "../../Schema/Setting";

export default function CreateShiftMobile({
  anchor,
  handleClose,
  open,
  setState,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  userLoginData,
}) {
  const [allDay, setAllDay] = React.useState(true);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [startTime, setStartTime] = useState(dayjs(new Date()));
  const [endTime, setEndTime] = useState(dayjs(new Date()));

  //get type off time off
  const [typeOfTimeOff, setTypeOfTimeOff] = useState([]);
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

  const typeOfTimeOffOptions =
    typeOfTimeOff?.map((e, index) => ({
      id: e?._id,
      label: e?.type_name,
    })) || [];

  const handleTypeOfTimeOff = (event, newValue) => {
    setFieldValue("type_of_timeoff", newValue.label);
  };

  const [createShift] = useMutation(CREATE_SHIFT, {
    onCompleted: ({ createShift }) => {
      console.log(createShift?.message);
      if (createShift?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createShift?.message);
        setRefetch();
        setState({ right: false });
      } else {
        setOpenError(true);
        setErrorMessage(createShift?.message);
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
        status_date: null,
        reply: {
          text: "",
          character: null,
        },
        status: "Pending",
        created_by: userLoginData?._id,
        approved_by: null,
      };
      // console.log("newRequest::>>>", newRequest);
      createShift({
        variables: {
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

  return (
    <Stack direction="column" className="box-form">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <Stack direction="row" className="stack-header">
                <Typography className="title">Employee Request</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}></Grid>
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
                    error={Boolean(touched.request_type && errors.request_type)}
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
                  className="field-select"
                  disablePortal
                  id="combo-box-demo"
                  options={typeOfTimeOffOptions}
                  onChange={handleTypeOfTimeOff}
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
                  <Typography className="header-body">Start date</Typography>
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
                  <Typography className="header-body">Start date</Typography>
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
                  <Typography className="header-body">Start time</Typography>
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
          </Grid>
        </Form>
      </FormikProvider>
      <Box sx={{ flexGrow: 1 }} />
      <Box className="box-action">
        <Stack direction="row" spacing={10}>
          <Button
            className="btn-cencel"
            onClick={() => setState({ right: false })}
          >
            Cencel
          </Button>
          <Button className="btn-add" onClick={handleSubmit}>
            Request
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
