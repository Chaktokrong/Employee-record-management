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
  Divider,
} from "@mui/material";
import { Crop } from "@mui/icons-material";
import "./userform.scss";
import { styled } from "@mui/material/styles";

// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

//Dialog
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

//Schema
import { UPDATE_USER } from "../../Schema/User";

// Apolo client
import { useMutation } from "@apollo/client";
import CropImageFile from "../CropImage/CropImageFile";

export default function Updateuser({
  open,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  row,
  userId,
}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  // avator
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

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
        updateUser({
          variables: {
            input: {
              ...values,
              image: {
                src: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
                name: imageFile?.name,
              },
              user_id: row?._id,
            },
          },
        });
      });
  };

  // Function Update User
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      // console.log(updateUser, "::: updateUser");
      if (updateUser?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateUser?.message);
        setRefetch();
        handleClose();
        resetForm();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(updateUser?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  // Create variable for Check condition required
  const UpdateUser = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    role: Yup.string().required(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      first_name: row?.first_name,
      last_name: row?.last_name,
      role: row?.role,
    },

    validationSchema: UpdateUser,
    onSubmit: (values) => {
      // console.log(values, ":: values");
      setLoading(true);
      if (imageFile) {
        uploadImage(imageFile, values);
      } else {
        updateUser({
          variables: {
            input: {
              ...values,
              image: {
                src: row?.image?.src,
                name: row?.image?.name,
              },
              user_id: row?._id,
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

  React.useEffect(() => {
    if (row) {
      setFieldValue("first_name", row?.first_name);
      setFieldValue("last_name", row?.last_name);
      setFieldValue("role", row?.role);
    }
  }, [row]);

  return (
    <Dialog open={open} className="users-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title">Update User</Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <ClearIcon onClick={handleClose} className="close-icon" />
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
                            {imageFile ? (
                              <Avatar
                                alt="Profile image"
                                className="import-image"
                                src={
                                  imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                                }
                              />
                            ) : (
                              <Avatar
                                alt="Profile image"
                                className="import-image"
                                src={
                                  row?.image?.src
                                    ? row?.image?.src
                                    : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                                }
                              />
                            )}
                          </Badge>
                          <input type="file" hidden />
                        </Button>
                      </Box>
                      <Typography className="field-title-image">
                        Profile Image
                      </Typography>
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
                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
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

                  <Grid item xs={12}>
                    <Typography className="field-title">Role</Typography>
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
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {loading ? (
                <Button className="btn-create">loading...</Button>
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
