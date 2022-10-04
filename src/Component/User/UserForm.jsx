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
import "./userform.scss";
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

// Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

export default function UserForm({
  open,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  // avator
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  // hide password
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //upload image
  const [imageFile, setImageFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  // console.log("imageFile::", imageFile)
  // console.log("photoURL::", photoURL)

  const handleUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      setPhotoURL(URL.createObjectURL(imageFile));
      setOpenCrop(true);
    }
  };

  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
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

    // console.log("compressedFile::", compressedFile)

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
        console.log(response?.data);
        createUser({
          variables: {
            input: {
              ...values,
              image: {
                src: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
                name: imageFile?.name,
              },
            },
          },
        });
      });
  };

  // Create User
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      // console.log(createUser, "::: createUser");
      if (createUser?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createUser?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(createUser?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setLoading(false);
      setErrorMessage(error.message);
    },
  });

  // formik user
  const AddUser = Yup.object().shape({
    first_name: Yup.string().required("First Name is required!"),
    last_name: Yup.string().required("Last Name is required!"),
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    role: Yup.string().required("role is required!"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "admin",
    },
    validationSchema: AddUser,
    onSubmit: (values) => {
      console.log(values, ":: values");
      setLoading(true);
      if (imageFile) {
        uploadImage(imageFile, values);
      } else {
        createUser({
          variables: {
            input: {
              ...values,
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
    resetForm,
  } = formik;

  return (
    <Dialog open={open} className="users-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">Create User</Typography>
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
                <Grid item xs={12}>
                  {!openCrop ? (
                    <Box>
                      <Box className="box-text-field">
                        <Button
                          component="label"
                          onClick={() => handleOpenUpload()}
                        >
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
                              alt="Profile image"
                              className="import-image"
                              src={
                                imageFile
                                  ? URL.createObjectURL(imageFile)
                                  : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                              }
                            />
                          </Badge>
                          <input type="file" hidden />
                        </Button>
                      </Box>
                      <Typography className="field-title-image">
                        Profile Image
                      </Typography>
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
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">First Name</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Your first name"
                      {...getFieldProps("first_name")}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Last Name</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Your last name"
                      {...getFieldProps("last_name")}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Email</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Example@gmail.com"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography className="field-title"> Password </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Your password"
                      type={show ? "text" : "password"}
                      {...getFieldProps("password")}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={handleClick}
                          >
                            {show ? (
                              <VisibilityIcon sx={{ cursor: "pointer" }} />
                            ) : (
                              <VisibilityOffIcon sx={{ cursor: "pointer" }} />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography className="field-title"> Role </Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("role")} displayEmpty>
                        <MenuItem value="admin">
                          <Typography>Admin</Typography>
                        </MenuItem>
                        <MenuItem value="superadmin">
                          <Typography>Superadmin</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
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
                  Create
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
