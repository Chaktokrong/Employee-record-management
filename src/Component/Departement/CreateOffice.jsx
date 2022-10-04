import React, { useState } from "react";
//material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./createoffice.scss";
import {
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Grid,
  Divider,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
import CropImageFile from "../CropImage/CropImageFile";
import Departmantimage from "../../Assets/logo.svg";
import { Crop } from "@mui/icons-material";

//component

//Schema
import { CREATE_OFFICE } from "../../Schema/office";
//apollo client
import { useQuery, useMutation } from "@apollo/client";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import { GET_EMPLOYEE_WITH_PAGINATION } from "../../Schema/Employee";

export default function CreateOffice({
  affairId,
  handleClose,
  btnTitle,
  open,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [loading, setLoading] = useState(false);

  // Get Employee
  const [employeeAuto, setEmployeeAuto] = useState([]);
  const { refetch } = useQuery(GET_EMPLOYEE_WITH_PAGINATION, {
    variables: {
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getEmployeePagination }) => {
      // console.log(getEmployeePagination?.employees);
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

  //upload image
  const [imageFile, setImageFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

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

  // Upload Image =========================================================================================
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
        createOffice({
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

  //create office
  const [createOffice] = useMutation(CREATE_OFFICE, {
    onCompleted: ({ createOffice }) => {
      console.log(createOffice, "createOffice");
      if (createOffice?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createOffice?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(createOffice?.message);
        setLoading(false);
      }
    },
    onError: ({ error }) => {
      console.log(error.message);
      setLoading(false);
    },
  });
  //formik
  const Addoffice = Yup.object().shape({
    office_name: Yup.string().required(),
    office_description: Yup.string(),
    head: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      office_name: "",
      office_description: "",
      head: "",
    },
    validationSchema: Addoffice,
    onSubmit: (values) => {
      // console.log("values", values)
      setLoading(true);
      let newOffice = {
        ...values,
        affair_id: affairId,
      };

      if (imageFile) {
        uploadImage(imageFile, newOffice);
      } else {
        createOffice({
          variables: {
            input: {
              ...newOffice,
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
    <Dialog open={open} className="create-office-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Create Office</Stack>
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
            <Form noValidate onSubmit={handleSubmit}>
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
                          src={
                            imageFile
                              ? URL.createObjectURL(imageFile)
                              : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                          }
                          className="avater-image"
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
                      <Typography className="header-title" variant="h6">
                        Logo Office
                      </Typography>
                    </Stack>

                    <Box className="crop-icon">
                      {imageFile && (
                        <IconButton
                          aria-label="Crop"
                          color="primary"
                          onClick={() => setOpenCrop(true)}
                        >
                          <Crop />
                        </IconButton>
                      )}
                    </Box>
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

              {/* infomation */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    Office Name
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Name of office"
                    {...getFieldProps("office_name")}
                    error={Boolean(touched.office_name && errors.office_name)}
                    helperText={touched.office_name && errors.office_name}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    Description
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="description"
                    {...getFieldProps("office_description")}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    Head of Office
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
