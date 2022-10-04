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
  Autocomplete,
  IconButton,
  OutlinedInput,
  Chip,
} from "@mui/material";
import "./createcontract.scss";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//Dialog
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Divider } from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
// Date Picker
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Icons
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
//Schema
import { MAKE_EMPLOYEE_CONTRACT } from "../../Schema/Contract";
import { GET_JOB_TITLE_WITH_PAGINATION } from "../../Schema/JobTitle";
import { GET_BRANCH, GET_TYPE_OF_TIME_OFF } from "../../Schema/Setting";
import { GET_QUERY_DEPARTMENT } from "../../Schema/Departement";
import { GET_OFFICE_IN_OFFAIR } from "../../Schema/office";
import { GET_SECTION_IN_OFFICE } from "../../Schema/Section";
// Apolo client
import { useMutation } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client";
//components
import CropImageFile from "../CropImage/CropImageFile";

export default function CreateContract({
  employeeId,
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
  // console.log("imageFile::", imageFile)
  // console.log("employeeId:::", employeeId);

  const [jobTitle, setJotTitle] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [office, setOffice] = useState([]);
  const [section, setSection] = useState([]);

  //=============================== Job Title Auto=========================================
  const { data: jobTitleData } = useQuery(GET_JOB_TITLE_WITH_PAGINATION, {
    variables: {
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getJobTitlesPagination }) => {
      setJotTitle(getJobTitlesPagination?.jobTitles);
    },
    onError: (error) => {
      // console.log(error.message);
    },
  });

  const jobTitleOptions =
    jobTitle?.map((e, index) => ({
      id: e?._id,
      label: e?.name,
    })) || [];

  const handleJobTitle = (event, newValue) => {
    setFieldValue("job_title", newValue.id);
  };

  //=============================== End Job Title Auto =========================================
  //=============================== Branch Auto =========================================
  const { data: branchDataRow } = useQuery(GET_BRANCH, {
    variables: {
      // page: 1,
      // limit: limit,
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getBranchPagination }) => {
      setBranchData(getBranchPagination);
      // console.log("getBranchPagination:::", getBranchPagination);
    },
  });

  const branchOptions =
    branchData?.branch?.map((e, index) => ({
      id: e?._id,
      label: e?.branch_name,
    })) || [];

  const handleBranch = (event, newValue) => {
    setFieldValue("branch", newValue.id);
  };

  //=============================== End branch Auto =========================================
  //=============================== Department Auto =========================================
  const { data: departmentData } = useQuery(GET_QUERY_DEPARTMENT, {
    variables: {
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getAffair }) => {
      // console.log(getAffair);
      setDepartment(getAffair);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const departmentOptions =
    department?.map((e, index) => ({
      id: e?._id,
      label: e?.affair_name,
    })) || [];

  const handleDepartment = (event, newValue) => {
    setFieldValue("department", newValue.id);
    getOfficeInAffair({
      variables: {
        affairId: newValue?.id,
      },
    });
  };

  //=============================== End department Auto =========================================
  //=============================== Office Auto =========================================

  const [getOfficeInAffair, { data: officeData, error }] = useLazyQuery(
    GET_OFFICE_IN_OFFAIR,
    {
      onCompleted: ({ getOfficeInAffair }) => {
        setOffice(getOfficeInAffair);
        // console.log("getOfficeInAffair::: ", getOfficeInAffair);
      },
    }
  );

  const officeOptions =
    office?.map((e, index) => ({
      id: e?._id,
      label: e?.office_name,
    })) || [];

  const handleOffice = (event, newValue) => {
    setFieldValue("office", newValue.id);
    getSectionInOffice({
      variables: {
        inOffice: newValue?.id,
      },
    });
  };

  //=============================== End office Auto =========================================
  //=============================== Section Auto =========================================

  const [getSectionInOffice, { data: sectionData }] = useLazyQuery(
    GET_SECTION_IN_OFFICE,
    {
      onCompleted: ({ getSectionInOffice }) => {
        setSection(getSectionInOffice);
        // console.log("getSectionInOffice::: ", getSectionInOffice);
      },
    }
  );
  // section
  const sectionOptions =
    section?.map((e, index) => ({
      id: e?._id,
      label: e?.section_name,
    })) || [];

  const handleSection = (event, newValue) => {
    setFieldValue("section", newValue.id);
  };
  //=============================== End section Auto =========================================
  //=============================== Select leave =========================================
  const [typeOfTimeOffName, setTypeOfTimeOffName] = useState([]);
  const [typeOfTimeOffOptions, setTypeOfTimeOffOptions] = useState([]);

  const { data: typeOfTimeOffData } = useQuery(GET_TYPE_OF_TIME_OFF, {
    onCompleted: ({ getTypeOfTimeOff }) => {
      let rows = [];
      getTypeOfTimeOff?.map((e) => {
        const allRow = {
          id: e?._id,
          title: e?.type_name,
        };
        rows.push(allRow);
      });
      setTypeOfTimeOffOptions(rows);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleTypeOfTimeOff = (event, newValue) => {
    // console.log("newValue:::", newValue);
    let rows = [];
    newValue?.map((e) => {
      const allRow = e?.id;
      rows.push(allRow);
    });
    setTypeOfTimeOffName(rows);
  };
  //=============================== End select eave =========================================

  // Create Contract
  const [makeEmployeeContract] = useMutation(MAKE_EMPLOYEE_CONTRACT, {
    onCompleted: ({ makeEmployeeContract }) => {
      // console.log(makeEmployeeContract, "::: makeEmployeeContract");
      if (makeEmployeeContract?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(makeEmployeeContract?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(makeEmployeeContract?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  // formik user
  const MakeContract = Yup.object().shape({
    title: Yup.string().required("Field is required!"),
    job_title: Yup.string().required("Field is required!"),
    branch: Yup.string().required("Field is required!"),
    department: Yup.string().required("Field is required!"),
    office: Yup.string().required("Field is required!"),
    section: Yup.string().required("Field is required!"),
    schedule: Yup.string().required("Field is required!"),
    base_salary: Yup.string().required("Field is required!"),
    start_date: Yup.string().required("Field is required!"),
    end_date: Yup.string().required("Field is required!"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      job_title: "",
      branch: "",
      department: "",
      office: "",
      section: "",
      schedule: "full-time",
      base_salary: "",
      start_date: new Date(),
      end_date: new Date(),
    },

    validationSchema: MakeContract,
    onSubmit: (values) => {
      // console.log(values, ":: values");
      setLoading(true);

      let newContract = {
        employee_id: employeeId,
        title: values?.title,
        job_title: values?.job_title,
        branch: values?.branch,
        department: values?.department,
        office: values?.office,
        section: values?.section,
        schedule: values?.schedule,
        base_salary: values?.base_salary,
        leave: typeOfTimeOffName,
        start_date: values?.start_date,
        end_date: values?.end_date,
      };
      // console.log("newContract:::", newContract);

      makeEmployeeContract({
        variables: {
          input: {
            ...newContract,
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
    resetForm,
  } = formik;

  const handleStartDate = (newValue) => {
    setFieldValue("start_date", newValue);
  };

  const handleEndDate = (newValue) => {
    setFieldValue("end_date", newValue);
  };

  return (
    <Dialog open={open} className="contract-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">
              Make Employee Contract
            </Typography>
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
                <Grid item container columnSpacing={3} rowSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Start date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        value={values?.start_date}
                        onChange={handleStartDate}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">End date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        value={values?.end_date}
                        onChange={handleEndDate}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Title</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="title"
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Job title</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={jobTitleOptions}
                      onChange={handleJobTitle}
                      getOptionLabel={(value) =>
                        value?.label ? value?.label : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="job title"
                          error={Boolean(touched.job_title && errors.job_title)}
                          helperText={touched.job_title && errors.job_title}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Branch</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={branchOptions}
                      onChange={handleBranch}
                      getOptionLabel={(value) =>
                        value?.label ? value?.label : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="branch"
                          error={Boolean(touched.branch && errors.branch)}
                          helperText={touched.branch && errors.branch}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Department</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={departmentOptions}
                      onChange={handleDepartment}
                      getOptionLabel={(value) =>
                        value?.label ? value?.label : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="department"
                          error={Boolean(
                            touched.department && errors.department
                          )}
                          helperText={touched.department && errors.department}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Office</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={officeOptions}
                      onChange={handleOffice}
                      getOptionLabel={(value) =>
                        value?.label ? value?.label : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="office"
                          error={Boolean(touched.office && errors.office)}
                          helperText={touched.office && errors.office}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Section</Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={sectionOptions}
                      onChange={handleSection}
                      getOptionLabel={(value) =>
                        value?.label ? value?.label : ""
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="section"
                          error={Boolean(touched.section && errors.section)}
                          helperText={touched.section && errors.section}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title"> Schedule </Typography>
                    <FormControl fullWidth size="small">
                      <Select {...getFieldProps("schedule")} displayEmpty>
                        <MenuItem value="full-time">
                          <Typography>Full time</Typography>
                        </MenuItem>
                        <MenuItem value="part-time">
                          <Typography>Part time</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className="field-title">Salary</Typography>
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      placeholder="salary"
                      {...getFieldProps("base_salary")}
                      error={Boolean(touched.base_salary && errors.base_salary)}
                      helperText={touched.base_salary && errors.base_salary}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography className="field-title">Leave</Typography>
                    <Autocomplete
                      multiple
                      id="size-small-outlined-multi"
                      size="small"
                      options={typeOfTimeOffOptions}
                      getOptionLabel={(value) =>
                        value?.title ? value?.title : ""
                      }
                      onChange={handleTypeOfTimeOff}
                      renderInput={(params) => <TextField {...params} />}
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
