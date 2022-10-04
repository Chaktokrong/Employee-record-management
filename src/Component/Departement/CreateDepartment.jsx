import React, { useState } from "react";
//material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./createdepartment.scss";
import {
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Avatar,
  Grid,
  Badge,
  Divider,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useQuery, useMutation } from "@apollo/client";
import { Crop } from "@mui/icons-material";

import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// Formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

// Shcema
import { CREATE_DEPARTEMENT } from "../../Schema/Departement";
import { GET_EMPLOYEE_WITH_PAGINATION } from "../../Schema/Employee";

// Date
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//component
import Departmantimage from "../../Assets/logo.svg";

//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
import CropImageFile from "../CropImage/CropImageFile";

export default function CreateDepartment({
  setRefetch,
  handleClose,
  open,
  btnTitle,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [loading, setLoading] = useState(false);
  //upload image
  const [imageFile, setImageFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  // Get Employee
  const [employeeAuto, setEmployeeAuto] = useState([]);
  const { refetch } = useQuery(GET_EMPLOYEE_WITH_PAGINATION, {
    variables: {
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getEmployeePagination }) => {
      // console.log(getEmployeePagination?.data);
      let rows = [];
      getEmployeePagination?.data?.forEach((element) => {
        let allRow = {
          id: element?._id,
          label:
            element?.latin_name?.first_name +
            " " +
            element?.latin_name?.last_name,
        };
        rows.push(allRow);
      });
      setEmployeeAuto(rows);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  //

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
        // console.log(response?.data);
        createAffair({
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

  // Create Department
  const [createAffair] = useMutation(CREATE_DEPARTEMENT, {
    onCompleted: ({ createAffair }) => {
      // console.log(createAffair, "::: createAffair");
      if (createAffair?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(createAffair?.message);
        setRefetch();
        handleClose();
        resetForm();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(createAffair?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  const AddDepartment = Yup.object().shape({
    affair_name: Yup.string().required("please input Department name."),
    affair_description: Yup.string(),
    head: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      affair_name: "",
      affair_description: "",
      head: "",
    },

    validationSchema: AddDepartment,
    onSubmit: (valuse) => {
      setLoading(true);
      if (imageFile) {
        uploadImage(imageFile, values);
      } else {
        createAffair({
          variables: {
            input: {
              ...valuse,
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
    <Dialog open={open} className="create-department-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Create Department </Stack>
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {!openCrop ? (
                    <Box>
                      <Stack
                        className="profile"
                        direction="row"
                        justifycontent="center"
                      >
                        <Button
                          component="label"
                          onClick={() => handleOpenUpload()}
                        >
                          <TextField
                            type="file"
                            id="image"
                            sx={{ display: "none" }}
                            onChange={handleUploadImage}
                          />
                          <Avatar
                            alt="Department image"
                            className="import-image"
                            src={
                              imageFile
                                ? URL.createObjectURL(imageFile)
                                : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                            }
                          />
                          <input type="file" hidden />
                        </Button>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                        sx={{ mt: 1, mb: 2 }}
                      >
                        <Typography className="header-title">Logo</Typography>
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
                </Grid>

                <Grid item xs={12}>
                  <Typography className="header-body" variant="body1">
                    Department Name
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Department Name"
                    {...getFieldProps("affair_name")}
                    error={Boolean(touched.affair_name && errors.affair_name)}
                    helperText={touched.affair_name && errors.affair_name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography className="header-body" variant="body1">
                    Description
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Description"
                    multiline
                    rows={4}
                    {...getFieldProps("affair_description")}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    Head of Department
                  </Typography>
                  <Autocomplete
                    disablePortal
                    options={employeeAuto}
                    onChange={(e, value) => setFieldValue("head", value?.id)}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        size="small"
                        error={Boolean(touched.head && errors.head)}
                        helperText={touched.head && errors.head}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Stack direction="column" spacing={1} sx={{ mt: 2 }}></Stack>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid container>
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
