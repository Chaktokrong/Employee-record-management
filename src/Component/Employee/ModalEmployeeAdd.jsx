import React, { useState } from "react";
//material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./ModalEmployeeAdd.scss";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Avatar,
  Grid,
  Badge,
  Divider,
  InputAdornment,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

//date picker
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";

//Emport Dialog from "@mui/material/Dialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@apollo/client";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Crop } from "@mui/icons-material";
//schema
import { CREATE_EMPLOYEE } from "../../Schema/Employee";
//component
import CropImageFile from "../CropImage/CropImageFile";

export default function ModalEmployeeAdd({
  handleClose,
  open,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  //upload image
  const [imageFile, setImageFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  // console.log("imageFile::", imageFile)

  const handleUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      setPhotoURL(URL.createObjectURL(imageFile));
      setOpenCrop(true);
    }
  };

  const newDate = moment(new Date()).format("MMdYYYY");
  const uploadImage = async (file, values) => {
    // console.log("files::", file);

    if (!file) return;
    const formData = new FormData();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    let newName = `${uuidv4()}${newDate}${file.name.split(".").pop()}`;
    var newFile = new File([compressedFile], `${newName}.png`, {
      type: "image/png",
    });
    // console.log("newFile::", newFile);
    formData.append("image", newFile);
    await axios
      .post(
        `${process.env.REACT_APP_UPLOAD_URL}/api/employee-image/upload`,
        formData,
        config
      )
      .then(async function (response) {
        // console.log(response?.data);
        createEmployee({
          variables: {
            input: {
              ...values,
              image: {
                src: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
                name: newFile?.name,
              },
            },
          },
        });
      });
  };

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: ({ createEmployee }) => {
      console.log(createEmployee?.message, "impoyee_create");
      if (createEmployee?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createEmployee?.message);
        setRefetch();
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(createEmployee?.message);
      }
    },
    oneError: ({ error }) => {
      console.log(error.massage);
    },
  });

  //formik
  const AddEmployee = Yup.object().shape({
    first_Name_kh: Yup.string().required("Please input your First name!"),
    last_Name_kh: Yup.string().required("Please input yout Last name!"),
    first_Name_Latin: Yup.string().required(
      "Please input your First latin name!"
    ),
    last_Name_Latin: Yup.string().required(
      "Please input your Last latin name!"
    ),
    gender: Yup.string().required("Please select your gender!"),
    date_Of_Birth: Yup.date().required(),
    email: Yup.string().email("Invalid email!"),
    place_Of_Birth: Yup.string().required("Please input your place of birth!"),
    current_address: Yup.string().required(
      "Please input your current address!"
    ),
    type: Yup.string().required("Please select type!"),
    national_id: Yup.string().required("Require field!"),
    nationality: Yup.string().required("Require field!"),
    phone: Yup.string().required("Require field!"),
    marital: Yup.string().required("Require field!"),
  });

  const formik = useFormik({
    initialValues: {
      first_Name_kh: "",
      last_Name_kh: "",
      first_Name_Latin: "",
      last_Name_Latin: "",
      gender: "Female",
      date_Of_Birth: new Date(),
      email: "",
      place_Of_Birth: "",
      current_address: "",
      type: "staff",
      national_id: "",
      nationality: "",
      phone: "",
      marital: "single",
    },

    validationSchema: AddEmployee,

    onSubmit: (values) => {
      // console.log(values, ":::: values");
      let newEmployee = {
        khmer_name: {
          first_name: values?.first_Name_kh,
          last_name: values?.last_Name_kh,
        },
        latin_name: {
          first_name: values?.first_Name_Latin,
          last_name: values?.last_Name_Latin,
        },
        gender: values?.gender,
        date_of_birth: values?.date_Of_Birth,
        email: values?.email,
        place_of_birth: values?.place_Of_Birth,
        current_address: values?.current_address,
        type: values?.type,
        national_id: values?.national_id,
        nationality: values?.nationality,
        phone: values?.phone,
        marital: values?.marital,
      };

      console.log("newEmployee:::", newEmployee);

      if (imageFile) {
        uploadImage(imageFile, newEmployee);
      } else {
        createEmployee({
          variables: {
            input: {
              ...newEmployee,
              image: {
                src: "",
                name: "",
              },
            },
          },
        });
      }
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
    <Dialog open={open} className="dialog-employee">
      <DialogTitle>
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">Create Employee</Typography>
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
        <DialogContentText id="alert-dialog-title">
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <Box className="create-employee">
                {!openCrop ? (
                  <Box>
                    <Stack
                      className="profile"
                      direction="row"
                      justifycontent="center"
                    >
                      <Button component="label">
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <PhotoCameraIcon className="icon-image" />
                          }
                        >
                          <TextField
                            type="file"
                            id="image"
                            sx={{ display: "none" }}
                            onChange={handleUploadImage}
                          />
                          <Avatar
                            className="avater-image"
                            src={
                              imageFile
                                ? URL.createObjectURL(imageFile)
                                : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                            }
                          />
                        </Badge>
                        <input type="file" hidden />
                      </Button>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      <Typography className="header-title">Profile</Typography>
                    </Stack>
                    {/* <Box className="crop-icon">
                      {imageFile && (
                        <IconButton
                          aria-label="Crop"
                          color="primary"
                          onClick={() => setOpenCrop(true)}
                        >
                          <Crop />
                        </IconButton>
                      )}
                    </Box> */}
                  </Box>
                ) : (
                  <CropImageFile
                    setImageFile={setImageFile}
                    photoURL={photoURL}
                    setOpenCrop={setOpenCrop}
                    setPhotoURL={setPhotoURL}
                  />
                )}

                <Grid item container columnSpacing={3} rowSpacing={1}>
                  <Grid item xs={12} md={6}>
                    <Typography className="header-body">
                      Name in Khmer
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="first name"
                      {...getFieldProps("first_Name_kh")}
                      error={Boolean(
                        touched.first_Name_kh && errors.first_Name_kh
                      )}
                      helperText={touched.first_Name_kh && errors.first_Name_kh}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: "20px" }}> </Box>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="last name"
                      {...getFieldProps("last_Name_kh")}
                      error={Boolean(
                        touched.last_Name_kh && errors.last_Name_kh
                      )}
                      helperText={touched.last_Name_kh && errors.last_Name_kh}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="header-body">
                      Name in Latin
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="first name"
                      {...getFieldProps("first_Name_Latin")}
                      error={Boolean(
                        touched.first_Name_Latin && errors.first_Name_Latin
                      )}
                      helperText={
                        touched.first_Name_Latin && errors.first_Name_Latin
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: "20px" }}> </Box>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="last name"
                      {...getFieldProps("last_Name_Latin")}
                      error={Boolean(
                        touched.last_Name_Latin && errors.last_Name_Latin
                      )}
                      helperText={
                        touched.last_Name_Latin && errors.last_Name_Latin
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="header-body">Gender</Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("gender")} displayEmpty>
                        <MenuItem value="Male">
                          <Typography>Male</Typography>
                        </MenuItem>
                        <MenuItem value="Female">
                          <Typography>Female</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="header-body">
                      Marital status
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("marital")} displayEmpty>
                        <MenuItem value="single">
                          <Typography>Single</Typography>
                        </MenuItem>
                        <MenuItem value="married">
                          <Typography>Married</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="header-body">Nationality</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="nationality"
                      {...getFieldProps("nationality")}
                      error={Boolean(touched.nationality && errors.nationality)}
                      helperText={touched.nationality && errors.nationality}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="header-body">Staff type</Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("type")} displayEmpty>
                        <MenuItem value="staff">
                          <Typography>Staff</Typography>
                        </MenuItem>
                        <MenuItem value="teaching">
                          <Typography>Teaching</Typography>
                        </MenuItem>
                        <MenuItem value="internship">
                          <Typography>Internship</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="header-body">
                      Date of Birth
                    </Typography>

                    <Box className="date-respon-desktop">
                      <LocalizationProvider
                        className="date-controll"
                        dateAdapter={AdapterDateFns}
                      >
                        <DatePicker
                          onChange={(newValue) => {
                            setFieldValue("date_Of_Birth", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              className="select-date"
                              size="small"
                              {...params}
                              type="date"
                              fullWidth
                            />
                          )}
                          value={values?.date_Of_Birth}
                        />
                      </LocalizationProvider>
                    </Box>

                    <Box className="date-respon-mobile">
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <MobileDatePicker
                          // inputFormat="DD/MM/yyyy"
                          value={values?.date_Of_Birth}
                          onChange={(e) => setFieldValue("date_Of_Birth", e)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <DateRangeIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="header-body">
                      Nationality ID
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="email"
                      {...getFieldProps("national_id")}
                      error={Boolean(touched.national_id && errors.national_id)}
                      helperText={touched.national_id && errors.national_id}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="header-body">
                      Phone number
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="phone"
                      {...getFieldProps("phone")}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="header-body">Email</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="email"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="header-body">
                      Place of Birth
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="place of birth"
                      {...getFieldProps("place_Of_Birth")}
                      error={Boolean(
                        touched.place_Of_Birth && errors.place_Of_Birth
                      )}
                      helperText={
                        touched.place_Of_Birth && errors.place_Of_Birth
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="header-body">
                      Current address
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="current address"
                      {...getFieldProps("current_address")}
                      error={Boolean(
                        touched.current_address && errors.current_address
                      )}
                      helperText={
                        touched.current_address && errors.current_address
                      }
                    />
                  </Grid>
                </Grid>

                <DialogActions>
                  <Box className="action-button">
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Button
                          className="btn-create"
                          fullWidth
                          onClick={handleSubmit}
                        >
                          Create
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </DialogActions>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
