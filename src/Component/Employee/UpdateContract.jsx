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
import { UPDATE_EMPOYEE_CONTRACT } from "../../Schema/Contract";
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

export default function UpdateContract({
  editData,
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

  console.log(editData);

  //
  const [jobTitle, setJotTitle] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [office, setOffice] = useState([]);
  const [section, setSection] = useState([]);

  //=============================== Job Title Auto=========================================
  const [jobSelected, setJobSelected] = useState({
    id: editData?.job_title?._id,
    label: editData?.job_title?.name,
  });
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
    setJobSelected(newValue);
  };

  //=============================== End Job Title Auto =========================================
  //=============================== Branch Auto =========================================
  const [branchSelected, setBranchSelected] = useState({
    id: editData?.branch?._id,
    label: editData?.branch?.branch_name,
  });
  const { data: branchDataRow } = useQuery(GET_BRANCH, {
    variables: {
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
    setBranchSelected(newValue);
  };

  //=============================== End branch Auto =========================================
  //=============================== Department Auto =========================================
  const [departmentSeleted, setdepartmentSeleted] = useState({
    id: editData?.department?._id,
    label: editData?.department?.affair_name,
  });
  const { data: departmentData } = useQuery(GET_QUERY_DEPARTMENT, {
    variables: {
      // page: 1,
      // limit: limit,
      keyword: "",
      pagination: false,
    },
    onCompleted: ({ getAffair }) => {
      setDepartment(getAffair);
    },
  });

  const departmentOptions =
    department?.map((e, index) => ({
      id: e?._id,
      label: e?.affair_name,
    })) || [];

  const handleDepartment = (event, newValue) => {
    setFieldValue("department", newValue.id);
    setdepartmentSeleted(newValue);
    getOfficeInAffair({
      variables: {
        affairId: newValue?.id,
      },
    });
  };

  //=============================== End department Auto =========================================
  //=============================== Office Auto =========================================
  const [officeSelected, setOfficeSelected] = useState({
    id: editData?.office?._id,
    label: editData?.office?.office_name,
  });
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
    setOfficeSelected(newValue);
    getSectionInOffice({
      variables: {
        inOffice: newValue?.id,
      },
    });
  };

  //=============================== End office Auto =========================================
  //=============================== Section Auto =========================================
  const [secetionSelect, setSectionSelect] = useState({
    id: editData?.section?._id,
    label: editData?.section?.section_name,
  });
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
    setSectionSelect(newValue);
  };
  //=============================== End section Auto =========================================

  //=============================== Select leave =========================================
  const [typeOffSelected, setTypeOffSelected] = useState();
  const [typeOfTimeOffName, setTypeOfTimeOffName] = useState([]);
  const { data: typeOfTimeOffData } = useQuery(GET_TYPE_OF_TIME_OFF, {
    onCompleted: ({ getTypeOfTimeOff }) => {
      // console.log("getTypeOfTimeOff::: ", getTypeOfTimeOff);
    },
  });

  const typeOfTimeOffOptions =
    typeOfTimeOffData?.getTypeOfTimeOff?.map((e, index) => ({
      id: e?._id,
      label: e?.type_name,
    })) || [];

  const handleTypeOfTimeOff = (event, newValue) => {
    // console.log("newValue:::", newValue);
    let rows = [];
    newValue?.map((e) => {
      const allRow = e?.id;
      rows.push(allRow);
    });
    setTypeOffSelected(newValue);
    setTypeOfTimeOffName(rows);
  };
  //=============================== End select eave =========================================

  // Create Contract
  const [editEmployeeContract] = useMutation(UPDATE_EMPOYEE_CONTRACT, {
    onCompleted: ({ editEmployeeContract }) => {
      // console.log(editEmployeeContract, "::: editEmployeeContract");
      if (editEmployeeContract?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(editEmployeeContract?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(editEmployeeContract?.message);
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
        id: editData?._id,
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
      console.log("newContract:::", newContract);

      editEmployeeContract({
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

  useEffect(() => {
    if (editData) {
      setFieldValue("title", editData?.title);
      setFieldValue("job_title", editData?.job_title?._id);
      setFieldValue("branch", editData?.branch?._id);
      setFieldValue("department", editData?.department?._id);
      setFieldValue("office", editData?.office?._id);
      setFieldValue("section", editData?.section?._id);
      setFieldValue("schedule", editData?.schedule);
      setFieldValue("base_salary", editData?.base_salary);
      setFieldValue("start_date", editData?.start_date);
      setFieldValue("end_date", editData?.end_date);

      if (editData?.leave?.length !== 0) {
        let rows = [];
        let rowUpdate = [];
        editData?.leave?.forEach((element) => {
          const allRow = {
            id: element?._id,
            label: element?.type_name,
          };
          const updateRow = element?._id;
          rowUpdate.push(updateRow);
          rows.push(allRow);
          //
          setTypeOffSelected(rows);
          setTypeOfTimeOffName(rowUpdate);
        });
      }
    }
  }, [editData]);

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
                      value={jobSelected}
                      onChange={handleJobTitle}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
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
                      value={branchSelected}
                      onChange={handleBranch}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
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
                      value={departmentSeleted}
                      onChange={handleDepartment}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
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
                      value={officeSelected}
                      onChange={handleOffice}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
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
                      value={secetionSelect}
                      onChange={handleSection}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
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
                      value={typeOffSelected}
                      onChange={handleTypeOfTimeOff}
                      getOptionLabel={(option) =>
                        option.label ? option.label : " "
                      }
                      getOptionSelected={(option, value) =>
                        option.id === value.id
                      }
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
