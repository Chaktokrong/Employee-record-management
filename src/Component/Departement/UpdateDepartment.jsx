import React, { useState, useEffect } from "react";
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
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import DateRangeIcon from "@mui/icons-material/DateRange";
import FlipMove from "react-flip-move";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useQuery, useMutation } from "@apollo/client";
import { Crop } from "@mui/icons-material";

import { GET_EMPLOYEE_WITH_PAGINATION } from "../../Schema/Employee";
// Formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
// Date
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//component
import Departmantimage from "../../Assets/undraw_images_re_0kll.svg";
import { UPDATE_DEPARTMENT } from "../../Schema/Departement";

//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
import CropImageFile from "../CropImage/CropImageFile";

export default function UpdateDepartment({
  DataRow,
  handleClose,
  open,
  setRefetch,
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
  const [employeeSelected, setEmployeeSelected] = useState();
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

  React.useEffect(() => {
    if (DataRow) {
      setEmployeeSelected({
        id: DataRow?.head?._id,
        label:
          DataRow?.head?.latin_name?.first_name +
          " " +
          DataRow?.head?.latin_name?.last_name,
      });
    }
  }, [DataRow]);
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
        updateAffair({
          variables: {
            input: {
              ...values,
              image: {
                src: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
                name: imageFile?.name,
              },
              id: DataRow?._id,
            },
          },
        });
      });
  };

  // Update Department
  const [updateAffair] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: ({ updateAffair }) => {
      // console.log(updateAffair, "::: updateAffair");
      if (updateAffair?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(updateAffair?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(updateAffair?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  const UpdateDepartment = Yup.object().shape({
    affair_name: Yup.string().required(),
    affair_description: Yup.string(),
    head: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      affair_name: DataRow?.affair_name,
      affair_description: DataRow?.affair_description,
      head: DataRow?.head?._id,
    },

    validationSchema: UpdateDepartment,
    onSubmit: (valuse) => {
      // console.log(valuse, ":: valuse");
      setLoading(true);
      if (imageFile) {
        uploadImage(imageFile, values);
      } else {
        updateAffair({
          variables: {
            input: {
              id: DataRow?._id,
              ...valuse,
              image: {
                src: DataRow?.image?.src,
                name: DataRow?.image?.name,
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
    <Dialog open={open} className="create-department-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Update Department </Stack>
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
                        {imageFile ? (
                          <Avatar
                            alt="Department image"
                            className="import-image"
                            src={
                              imageFile
                                ? URL.createObjectURL(imageFile)
                                : Departmantimage
                            }
                          />
                        ) : (
                          <Avatar
                            alt="Department image"
                            className="import-image"
                            src={
                              DataRow?.image?.src
                                ? DataRow?.image?.src
                                : Departmantimage
                            }
                          />
                        )}
                        <input type="file" hidden />
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                      sx={{ mt: 1, mb: 2 }}
                    >
                      <Typography className="header-title">
                        {" "}
                        Logo Department{" "}
                      </Typography>
                    </Stack>
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
                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    {" "}
                    Department Name{" "}
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
                <Grid item xs={12} md={12}>
                  <Typography className="header-body" variant="body1">
                    {" "}
                    Description{" "}
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
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
                    value={employeeSelected}
                    getOptionLabel={(option) =>
                      option.label !== "undefined undefined"
                        ? option.label
                        : " "
                    }
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(e, value) => {
                      setFieldValue("head", value?.id);
                      setEmployeeSelected(value);
                    }}
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
