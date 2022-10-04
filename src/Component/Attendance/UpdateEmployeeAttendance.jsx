import React, { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Switch,
  FormControlLabel,
  Modal,
  InputAdornment,
  Badge,
  IconButton,
} from "@mui/material";
import "./updateemployeeattendance.scss";
import { styled } from "@mui/material/styles";
import { Crop } from "@mui/icons-material";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";

//Dialog
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Divider } from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

//date picker
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateRangeIcon from "@mui/icons-material/DateRange";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
//Schema
import { CREATE_USER } from "../../Schema/User";

// Apolo client
import { useMutation } from "@apollo/client";
import CropImageFile from "../CropImage/CropImageFile";

export default function UpdateEmployeeAttendace({
  open,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [loading, setLoading] = useState(false);

  // formik user
  const AddUser = Yup.object().shape({
    time_check_in: Yup.string(),
    time_check_out: Yup.string(),
    attendance: Yup.string(),
    fine: Yup.number(),
    employee_name: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      time_check_in: "dayjs('2022-08-18T21:11:54')",
      time_check_out: "dayjs('2022-08-18T21:11:54')",
      attendance: "",
      fine: 0,
      employee_name: "Long Dara",
    },

    validationSchema: AddUser,
    onSubmit: (values) => {
      console.log(values, ":: values");
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} className="employee-attendance-update-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">Update Attendance</Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton>
            <DoDisturbOnOutlinedIcon
              onClick={handleClose}
              className="close-icon"
            />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 1 }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box className="box-form">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Typography className="field-title">
                      Employee's Name
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      {...getFieldProps("employee_name")}
                      error={Boolean(
                        touched.employee_name && errors.employee_name
                      )}
                      helperText={touched.employee_name && errors.employee_name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Check In</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={values.time_check_in}
                        onChange={(e) => setFieldValue("time_check_in", e)}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Check Out</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={values.time_check_out}
                        onChange={(e) => setFieldValue("time_check_out", e)}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Attendance</Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("attendance")} displayEmpty>
                        <MenuItem value="Adsent">
                          <Typography>Adsent</Typography>
                        </MenuItem>
                        <MenuItem value="Late">
                          <Typography>Late</Typography>
                        </MenuItem>
                        <MenuItem value="Present">
                          <Typography>Present</Typography>
                        </MenuItem>
                        <MenuItem value="Permission">
                          <Typography>Permission</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Fine</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="0"
                      {...getFieldProps("fine")}
                      error={Boolean(touched.fine && errors.fine)}
                      helperText={touched.fine && errors.fine}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography className="field-title"> Reason </Typography>
                    <TextField
                      multiline
                      size="small"
                      fullWidth
                      placeholder=""
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid item container spacing={4}>
            <Grid item xs={12}>
              {loading ? (
                <Button className="btn-create">Loading...</Button>
              ) : (
                <Button className="btn-create" onClick={handleSubmit}>
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
