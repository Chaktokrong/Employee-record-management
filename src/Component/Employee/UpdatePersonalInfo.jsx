import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Switch,
  Button,
  Avatar,
  Select,
  FormControl,
  MenuItem,
  Badge,
} from "@mui/material";
import { Box } from "@mui/system";
import "./EmployeeUpdate.scss";
//icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//date time picker
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";
import AlertMessage from "../AlertMessage/AlertMessage";
import BorderColorIcon from "@mui/icons-material/BorderColor";
//Apollo client
import { useMutation } from "@apollo/client/react";
import { useQuery } from "@apollo/client/react";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//Schema
import { UPDATE_EMPLOYEE, GET_EMPLOYEE_BYID } from "../../Schema/Employee";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import axios from "axios";
//component
import CropImageFile from "../CropImage/CropImageFile";
import ListEducation from "./ListEducation";
import ListExperience from "./ListExperience";
import ListWorkPermit from "./ListWorkPermit";
import ListInsurance from "./ListInsurance";

export default function UpdatePersonalInfo() {
  const [loading, setLoading] = useState(false);
  //get Storage Room ID by Url
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [employeeID, setEmployeeID] = React.useState(params.get("id"));

  React.useEffect(() => {
    setEmployeeID(params.get("id"));
  }, [location.search]);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  //upload image
  const [imageFile, setImageFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  //date picker Education
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());

  const navigate = useNavigate();

  // const location = useLocation();
  // const viewData = location?.state?.Datarow;
  const [viewData, setViewData] = React.useState(null);

  const { data, refetch } = useQuery(GET_EMPLOYEE_BYID, {
    variables: {
      getEmployeeByIdId: employeeID,
    },
    onCompleted: ({ getEmployeeById }) => {
      console.log(getEmployeeById);
      setViewData(getEmployeeById);
    },
  });

  React.useState(() => {
    if (data?.getEmployeeById) {
      setViewData(data?.getEmployeeById);
    }
  }, []);

  // setUp list education ==============================================================================
  const [currentEducation, setCurrentEducation] = React.useState({
    start_end_date: "",
    title: "",
    school: "",
    key: "",
  });
  const [educationlist, setEducationlist] = React.useState([]);

  const addEducation = () => {
    const newItem = currentEducation;
    if (newItem.key !== "") {
      const items = [...educationlist, newItem];
      setEducationlist([...items]);
      setCurrentEducation({
        start_end_date: "",
        title: "",
        school: "",
        key: "",
      });
    }
  };

  const handleAddEducation = () => {
    setCurrentEducation({
      start_end_date: "Start year - End year",
      title: "Major",
      school: "University name",
      key: Date.now(),
    });
  };

  React.useEffect(() => {
    if (currentEducation?.key !== "") {
      addEducation();
    }
  }, [currentEducation]);

  const deleteItem = (key) => {
    const filteredItems = educationlist?.filter((t) => t.key !== key);
    setEducationlist(filteredItems);
  };

  const setUpdateTitle = (title, key) => {
    const items = educationlist;
    items.map((i) => {
      if (i.key === key) {
        i.title = title;
      }
    });
    setEducationlist([...items]);
  };

  const setUpdateYear = (start_End_Date, key) => {
    const items = educationlist;
    items.map((i) => {
      if (i.key === key) {
        i.start_end_date = start_End_Date;
      }
    });
    setEducationlist([...items]);
  };

  const setUpdateSchool = (school, key) => {
    const items = educationlist;
    items.map((i) => {
      if (i.key === key) {
        i.school = school;
      }
    });
    setEducationlist([...items]);
  };
  // End list education ==================================================================

  // List Work Permit ========================================================
  const [currentWorkPermit, setCurrentWorkPermit] = React.useState({
    expire_date: "",
    work_permit_name: "",
    key: "",
  });
  const [workPermitList, setWorkPermitList] = React.useState([]);

  const addWorkPermit = () => {
    const newItem = currentWorkPermit;

    if (newItem !== "") {
      const items = [...workPermitList, newItem];
      setWorkPermitList([...items]);
      setCurrentWorkPermit({
        expire_date: "",
        work_permit_name: "",
        key: "",
      });
    }
  };

  const handleAddWorkPermitList = () => {
    setCurrentWorkPermit({
      expire_date: dayjs(new Date()),
      work_permit_name: "",
      key: Date.now(),
    });
  };
  React.useEffect(() => {
    if (currentWorkPermit?.key !== "") {
      addWorkPermit();
    }
  }, [currentWorkPermit]);

  // Delete function
  const deleteWorkPermit = (key) => {
    const filteredItems = workPermitList?.filter((t) => t?.key !== key);
    setWorkPermitList(filteredItems);
  };

  // Map tiitle
  const setUpdateNameWorkPermit = (work_permit_name, key) => {
    const items = workPermitList;
    items.map((i) => {
      if (i.key == key) {
        i.work_permit_name = work_permit_name;
      }
    });
    setWorkPermitList([...items]);
  };

  // Map Date
  const setUpdateExpireWorkPermit = (expire_date, key) => {
    const items = workPermitList;
    items.map((i) => {
      if (i.key === key) {
        i.expire_date = expire_date;
      }
    });
    setWorkPermitList([...items]);
  };
  // End List Work Permit ========================================================

  // List Insurance ========================================================
  const [currentisurance, setCurrenIsurance] = React.useState({
    start_end_date: "",
    title: "",
    key: "",
  });
  const [insuranceList, setInsuranceList] = React.useState([]);

  const addInsurrance = () => {
    const newItem = currentisurance;

    if (newItem !== "") {
      const items = [...insuranceList, newItem];
      setInsuranceList([...items]);
      setCurrenIsurance({ start_end_date: "", title: "", key: "" });
    }
  };

  const handleAddInsuranceList = () => {
    setCurrenIsurance({
      start_end_date: "Start year - End year",
      title: "Institutions",
      key: Date.now(),
    });
  };
  React.useEffect(() => {
    if (currentisurance?.key !== "") {
      addInsurrance();
    }
  }, [currentisurance]);

  // Delete function
  const deleteInsurance = (key) => {
    const filteredItems = insuranceList?.filter((t) => t?.key !== key);
    setInsuranceList(filteredItems);
  };

  // Map tiitle
  const setUpdateTitleInsurance = (title, key) => {
    const items = insuranceList;
    items.map((i) => {
      if (i.key == key) {
        i.title = title;
      }
    });
    setInsuranceList([...items]);
  };

  // Map Date
  const setUpdateYearInsurance = (start_End_Date, key) => {
    const items = insuranceList;
    items.map((i) => {
      if (i.key === key) {
        i.start_end_date = start_End_Date;
      }
    });
    setInsuranceList([...items]);
  };
  // End List Insurance ========================================================

  //Start setup List Job Experien==========================
  const [currenexperien, setcurrentExperience] = React.useState({
    start_end_date: "",
    company: "",
    title: "",
    key: "",
  });
  const [experienlist, setExperiencelist] = React.useState([]);

  const addExperience = () => {
    const newItem = currenexperien;
    if (newItem.key !== "") {
      const items = [...experienlist, newItem];
      setExperiencelist([...items]);
      setcurrentExperience({
        start_end_date: "",
        company: "",
        title: "",
        key: "",
      });
    }
  };

  const handleAddExperience = () => {
    setcurrentExperience({
      start_end_date: "Start year - End year",
      company: "Compony name",
      title: "Positions",
      key: Date.now(),
    });
  };

  React.useEffect(() => {
    if (currenexperien?.key !== "") {
      addExperience();
    }
  }, [currenexperien]);

  const deleteItemExperien = (key) => {
    const filteredItems = experienlist?.filter((t) => t.key !== key);
    setExperiencelist(filteredItems);
  };

  const setUpdateCompanyExperience = (company, key) => {
    const items = experienlist;
    items.map((i) => {
      if (i.key === key) {
        i.company = company;
      }
    });
    setExperiencelist([...items]);
  };

  const setUpdateTitleExperience = (title, key) => {
    const items = experienlist;
    items.map((i) => {
      if (i.key === key) {
        i.title = title;
      }
    });
    setExperiencelist([...items]);
  };

  const setUpdateYearExperience = (start_End_Date, key) => {
    const items = experienlist;
    items.map((i) => {
      if (i.key === key) {
        i.start_end_date = start_End_Date;
      }
    });
    setExperiencelist([...items]);
  };

  // =============================Set Value to Input ============================
  React.useEffect(() => {
    console.log("viewData::", viewData);

    if (viewData !== null) {
      setFieldValue("first_Name_kh", viewData?.khmer_name?.first_name);
      setFieldValue("last_Name_kh", viewData?.khmer_name?.last_name);
      setFieldValue("first_Name_Latin", viewData?.latin_name?.first_name);
      setFieldValue("last_Name_Latin", viewData?.latin_name?.last_name);
      setFieldValue("gender", viewData?.gender);
      setFieldValue("date_Of_Birth", viewData?.date_of_birth);
      setFieldValue("place_Of_Birth", viewData?.place_of_birth);
      setFieldValue("current_address", viewData?.current_address);
      setFieldValue(
        "national_id",
        viewData?.national_id !== null ? viewData?.national_id : ""
      );
      setFieldValue(
        "nationality",
        viewData?.nationality !== null ? viewData?.nationality : ""
      );
      setFieldValue(
        "marital",
        viewData?.marital !== null ? viewData?.marital : "single"
      );
      setFieldValue("phone", viewData?.phone !== null ? viewData?.phone : "");
      setFieldValue("email", viewData?.email !== null ? viewData?.email : "");
      setFieldValue("type", viewData?.type !== null ? viewData?.type : "");
      setFieldValue(
        "marital",
        viewData?.marital !== null ? viewData?.marital : ""
      );
      setDateOfBirth(viewData?.date_of_birth);

      if (viewData?.edu_background?.length !== 0) {
        let rows = [];
        viewData?.edu_background?.map((e) => {
          const allRow = {
            start_end_date: e?.start_end_date,
            title: e?.title,
            school: e?.school,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setEducationlist(rows);
      }

      if (viewData?.experience?.length !== 0) {
        let rows = [];
        viewData?.experience?.map((e) => {
          const allRow = {
            start_end_date: e?.start_end_date,
            title: e?.title,
            company: e?.company,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setExperiencelist(rows);
      }

      if (viewData?.insurance?.length !== 0) {
        let rows = [];
        viewData?.insurance?.map((e) => {
          const allRow = {
            start_end_date: e?.start_end_date,
            title: e?.title,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setInsuranceList(rows);
      }

      if (viewData?.work_permit?.length !== 0) {
        let rows = [];
        viewData?.work_permit?.map((e) => {
          const allRow = {
            work_permit_name: e?.work_permit_name,
            expire_date: e?.expire_date,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setWorkPermitList(rows);
      }
    }
  }, [viewData]);
  // ================================= End Set ===============================

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
        updateEmployee({
          variables: {
            // id: viewData?._id,
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

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: ({ updateEmployee }) => {
      // console.log("updateEmployee::", updateEmployee);
      setOpenSuccess(true);
      setSuccesstMessage(updateEmployee?.message);
      refetch();
      setLoading(false);
      setTimeout(() => {
        navigate(
          `/employee/employeedetail?id=${viewData?._id}&tab=information`
        );
      }, 2000);
    },
    onError: (error) => {
      console.log(error?.message);
      setOpenError(true);
      setErrorMessage(error?.message);
      setLoading(false);
    },
  });

  // Formik employee
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
      setLoading(true);
      let newEmployee = {
        id: viewData?._id,
        khmer_name: {
          first_name: values?.first_Name_kh,
          last_name: values?.last_Name_kh,
        },
        latin_name: {
          first_name: values?.first_Name_Latin,
          last_name: values?.last_Name_Latin,
        },
        gender: values?.gender,
        date_of_birth: dateOfBirth,
        place_of_birth: values?.place_Of_Birth,
        national_id: values?.national_id,
        nationality: values?.nationality,
        marital: values?.marital,
        phone: values?.phone,
        email: values?.email,
        type: values?.type,
        edu_background: educationlist,
        experience: experienlist,
        work_permit: workPermitList,
        insurance: insuranceList,
      };

      console.log("newEmployee::>>>", newEmployee);

      if (imageFile) {
        uploadImage(imageFile, newEmployee);
      } else {
        updateEmployee({
          variables: {
            input: {
              ...newEmployee,
              image: {
                src: viewData?.image?.src,
                name: viewData?.image?.name,
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

  // console?.log(values);

  return (
    <div className="DetailEmployee">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">
            <b
              onClick={() => navigate("/employee")}
              style={{ cursor: "pointer" }}
            >
              Employee{" "}
            </b>
            /{" "}
            {viewData?.latin_name?.last_name +
              " " +
              viewData?.latin_name?.first_name}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={5} className="btn-add">
          {loading ? (
            <Button sx={{ color: "white" }} endIcon={<BorderColorIcon />}>
              <Typography className="style-add">Loading...</Typography>
            </Button>
          ) : (
            <Button
              sx={{ color: "white" }}
              endIcon={<BorderColorIcon />}
              onClick={handleSubmit}
            >
              <Typography className="style-add">Update</Typography>
            </Button>
          )}
        </Stack>
      </Stack>

      <Box sx={{ flexGrow: 1 }} className="main_containner">
        <Box sx={{ mb: 3 }}>
          <Typography variant="body">Update information's employee.</Typography>
        </Box>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={6} xl={4}>
                <Box className="profile-container">
                  {!openCrop ? (
                    <Box>
                      <Stack
                        className="profile"
                        direction="row"
                        justifycontent="center"
                      >
                        <IconButton component="label">
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
                                : viewData?.image?.src
                            }
                          />
                          <input type="file" hidden />
                        </IconButton>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                        sx={{ mt: 1, mb: 2 }}
                      >
                        <Typography className="profile-title">
                          Profile
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
                  <Grid item container spacing={2}>
                    <Grid item xs={6}>
                      <Typography className="title-field">
                        First khmer name
                      </Typography>
                      <TextField
                        multiline
                        size="small"
                        className="input-field"
                        placeholder="first khmer name"
                        {...getFieldProps("first_Name_kh")}
                        error={Boolean(
                          touched.first_Name_kh && errors.first_Name_kh
                        )}
                        helperText={
                          touched.first_Name_kh && errors.first_Name_kh
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Last khmer name
                      </Typography>
                      <TextField
                        multiline
                        size="small"
                        className="input-field"
                        placeholder="last khmer name"
                        {...getFieldProps("last_Name_kh")}
                        error={Boolean(
                          touched.last_Name_kh && errors.last_Name_kh
                        )}
                        helperText={touched.last_Name_kh && errors.last_Name_kh}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="title-field">
                        First latin name
                      </Typography>
                      <TextField
                        multiline
                        size="small"
                        className="input-field"
                        placeholder="first latin name"
                        {...getFieldProps("first_Name_Latin")}
                        error={Boolean(
                          touched.first_Name_Latin && errors.first_Name_Latin
                        )}
                        helperText={
                          touched.first_Name_Latin && errors.first_Name_Latin
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Last latin name
                      </Typography>
                      <TextField
                        multiline
                        size="small"
                        className="input-field"
                        placeholder="last latin name"
                        {...getFieldProps("last_Name_Latin")}
                        error={Boolean(
                          touched.last_Name_Latin && errors.last_Name_Latin
                        )}
                        helperText={
                          touched.last_Name_Latin && errors.last_Name_Latin
                        }
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography className="title-field">Gender</Typography>
                      <FormControl
                        className="field-select"
                        size="small"
                        sx={{ width: "100%" }}
                      >
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

                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Date of Birth
                      </Typography>
                      <LocalizationProvider
                        className="date-controll"
                        dateAdapter={AdapterMoment}
                      >
                        <MobileDatePicker
                          className="border-title-color"
                          inputFormat="DD/MM/yyyy"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e)}
                          renderInput={(params) => (
                            <TextField
                              className="date-input"
                              {...params}
                              size="small"
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <DateRangeIcon className="icon-date" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Nationality ID
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        size="small"
                        placeholder="nationality id"
                        {...getFieldProps("national_id")}
                        error={Boolean(
                          touched.national_id && errors.national_id
                        )}
                        helperText={touched.national_id && errors.national_id}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Nationality
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        placeholder="nationality"
                        size="small"
                        {...getFieldProps("nationality")}
                        error={Boolean(
                          touched.nationality && errors.nationality
                        )}
                        helperText={touched.nationality && errors.nationality}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Typography className="title-field">
                        Marital status
                      </Typography>
                      <FormControl
                        className="field-select"
                        size="small"
                        sx={{ width: "100%" }}
                      >
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

                    <Grid item xs={12}>
                      <Typography className="title-field">
                        Place of birth
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        placeholder="place of birth"
                        size="small"
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
                      <Typography className="title-field">
                        Phone number
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        size="small"
                        placeholder="phone number"
                        {...getFieldProps("phone")}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography className="front-title-field">
                        Email address
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        size="small"
                        placeholder="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography className="title-field">
                        Current address
                      </Typography>
                      <TextField
                        multiline
                        className="input-field"
                        placeholder="place of birth"
                        size="small"
                        {...getFieldProps("place_Of_Birth")}
                        error={Boolean(
                          touched.place_Of_Birth && errors.place_Of_Birth
                        )}
                        helperText={
                          touched.place_Of_Birth && errors.place_Of_Birth
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} md={6} xl={4}>
                <Stack className="Main-descriptoin">
                  <Grid item container spacing={0}>
                    <Grid item xs={10}>
                      <Typography className="title-list-add">
                        Education
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={handleAddEducation}
                        className="btn-list-icon"
                      >
                        <AddCircleOutlineIcon className="add-list-icon" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <ListEducation
                        items={educationlist}
                        setUpdateTitle={setUpdateTitle}
                        setUpdateYear={setUpdateYear}
                        setUpdateSchool={setUpdateSchool}
                        deleteItem={deleteItem}
                      />
                    </Grid>
                    <Grid item xs={10} sx={{ marginTop: "20px" }}>
                      <Typography className="title-list-add">
                        Job Experience
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ marginTop: "20px" }}>
                      <IconButton
                        onClick={handleAddExperience}
                        className="btn-list-icon"
                      >
                        <AddCircleOutlineIcon className="add-list-icon" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <ListExperience
                        items={experienlist}
                        setUpdateCompanyExperience={setUpdateCompanyExperience}
                        setUpdateTitleExperience={setUpdateTitleExperience}
                        setUpdateYearExperience={setUpdateYearExperience}
                        deleteItemExperien={deleteItemExperien}
                      />
                    </Grid>

                    <Grid item xs={10} sx={{ marginTop: "20px" }}>
                      <Typography className="title-list-add">
                        Insurance
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ marginTop: "20px" }}>
                      <IconButton
                        onClick={handleAddInsuranceList}
                        className="btn-list-icon"
                      >
                        <AddCircleOutlineIcon className="add-list-icon" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      <ListInsurance
                        items={insuranceList}
                        setUpdateTitleInsurance={setUpdateTitleInsurance}
                        setUpdateYearInsurance={setUpdateYearInsurance}
                        deleteInsurance={deleteInsurance}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6} xl={4}>
                <Grid item container spacing={2}>
                  <Grid item xs={10}>
                    <Typography className="title-list-add">
                      Work permit
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={handleAddWorkPermitList}
                      className="btn-list-icon"
                    >
                      <AddCircleOutlineIcon className="add-list-icon" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <ListWorkPermit
                      items={workPermitList}
                      setUpdateNameWorkPermit={setUpdateNameWorkPermit}
                      setUpdateExpireWorkPermit={setUpdateExpireWorkPermit}
                      deleteWorkPermit={deleteWorkPermit}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>

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
