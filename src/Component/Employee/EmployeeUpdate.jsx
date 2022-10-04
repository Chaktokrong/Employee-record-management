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
import ListDepartment from "./ListDepartment";
import ListInsurance from "./ListInsurance";
import Listcontract from "./Listcontract";
import ListWorkPermit from "./ListWorkPermit";
//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import axios from "axios";
//component
import CropImageFile from "../CropImage/CropImageFile";

export default function EmployeeUpdate() {
  const [loading, setLoading] = useState(false);
  //get Storage Room ID by Url
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [employeeID, setEmployeeID] = React.useState(params.get("id"));

  React.useEffect(() => {
    setEmployeeID(params.get("id"));
  }, [location.search]);
  const [checkFieldRequired, setCheckFieldRequried] = useState(false);
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
  const [joinDate, setJoinDate] = React.useState(new Date());
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [workBook, setWorkBook] = useState(true);

  const navigate = useNavigate();

  // const location = useLocation();
  // const viewData = location?.state?.Datarow;
  const [viewData, setViewData] = React.useState(null);

  const { data, refetch } = useQuery(GET_EMPLOYEE_BYID, {
    variables: {
      getEmployeeByIdId: employeeID,
    },
    onCompleted: ({ getEmployeeById }) => {
      // console.log(getEmployeeById)
      setViewData(getEmployeeById);
    },
  });

  React.useState(() => {
    if (data?.getEmployeeById) {
      setViewData(data?.getEmployeeById);
    }
  }, []);

  //List Department===========================================
  const [currenedepartment, setCurreneDepartment] = React.useState({
    affair_id: "",
    office_id: "",
    section_id: "",
    affair_name: "",
    office_name: "",
    section_name: "",
    key: "",
  });
  const [departmentList, setDepartmentList] = React.useState([]);

  const adddepartment = () => {
    const newItem = currenedepartment;
    if (newItem.key !== "") {
      const items = [...departmentList, newItem];
      setDepartmentList([...items]);
      setCurreneDepartment({
        affair_id: "",
        office_id: "",
        section_id: "",
        affair_name: "",
        office_name: "",
        section_name: "",
        key: "",
      });
    }
  };

  const handleAddDepartment = () => {
    setCurreneDepartment({
      affair_id: "your department",
      office_id: "your office",
      section_id: "your section",
      affair_name: "",
      office_name: "",
      section_name: "",
      key: Date.now(),
    });
    // setCheckFieldRequried(true);
  };

  // use Effect for add list
  React.useEffect(() => {
    if (currenedepartment?.key !== "") {
      adddepartment();
    }
  }, [currenedepartment]);

  // Function Delete
  const deleteDepartment = (key) => {
    const filteredItems = departmentList?.filter((t) => t.key !== key);
    setDepartmentList(filteredItems);
    setCheckFieldRequried(false);
  };

  // Map Affair
  const setUpdateAffairDepartment = (affair_Id, affair_name, key) => {
    const items = departmentList;
    items.map((i) => {
      if (i.key === key) {
        i.affair_id = affair_Id;
        i.affair_name = affair_name;
      }
    });
    if (affair_Id === "your department" || affair_Id === undefined) {
      setCheckFieldRequried(true);
    } else {
      setCheckFieldRequried(false);
    }
    setDepartmentList([...items]);
  };

  // Map Office
  const setUpdateOfficeDepartment = (office_Id, office_name, key) => {
    const items = departmentList;
    items.map((i) => {
      if (i.key === key) {
        i.office_id = office_Id;
        i.office_name = office_name;
      }
    });
    if (office_Id === "your office" || office_Id === undefined) {
      setCheckFieldRequried(true);
    } else {
      setCheckFieldRequried(false);
    }
    setDepartmentList([...items]);
  };

  // Map Section
  const setUpdateSectionDepartment = (section_Id, section_name, key) => {
    const items = departmentList;
    items.map((i) => {
      if (i.key === key) {
        i.section_id = section_Id;
        i.section_name = section_name;
      }
    });
    if (section_Id === "your section" || section_Id === undefined) {
      setCheckFieldRequried(true);
    } else {
      setCheckFieldRequried(false);
    }
    setDepartmentList([...items]);
  };

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

  //Start List Contract=========================================================
  const [currentcontract, setCurrenContract] = React.useState({
    in_position: "",
    start_date: "",
    end_date: "",
    public_holiday: "",
    salary: "",
    annual_leave: "",
    key: "",
  });
  const [contractList, setContractList] = React.useState([]);

  const addContract = () => {
    const newItem = currentcontract;

    if (newItem !== "") {
      const items = [...contractList, newItem];
      setContractList([...items]);
      setCurrenContract({
        in_position: "",
        start_date: "",
        end_date: "",
        public_holiday: "",
        salary: "",
        annual_leave: "",
        key: "",
      });
    }
  };

  const handleAddContract = () => {
    setCurrenContract({
      in_position: "position",
      start_date: dayjs(new Date()),
      end_date: dayjs(new Date()),
      public_holiday: 0,
      salary: 0,
      annual_leave: 0,
      key: Date.now(),
    });
  };
  React.useEffect(() => {
    if (currentcontract?.key !== "") {
      addContract();
    }
  }, [currentcontract]);

  // Delete function
  const deleteContract = (key) => {
    const filteredItems = contractList?.filter((t) => t?.key !== key);
    setContractList(filteredItems);
  };
  // Map position
  const setUpdatePositioncontract = (in_Position, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.in_position = in_Position;
      }
    });
    setContractList([...items]);
  };

  // Map start_Date
  const setUpdateStartdatecontract = (start_Date, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.start_date = start_Date;
      }
    });
    setContractList([...items]);
  };
  const setUpdateEnddatecontract = (end_Date, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.end_date = end_Date;
      }
    });
    setContractList([...items]);
  };
  const setUpdatePublicholidaycontract = (public_Holiday, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.public_holiday = parseInt(public_Holiday);
      }
    });
    setContractList([...items]);
  };
  const setUpdateSalarycontract = (salary, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.salary = parseInt(salary);
      }
    });
    setContractList([...items]);
  };

  const setUpdateAnnualLeavecontract = (annual_Leave, key) => {
    const items = contractList;
    items.map((i) => {
      if (i.key == key) {
        i.annual_leave = parseInt(annual_Leave);
      }
    });
    setContractList([...items]);
  };
  //end Contract==========================================================

  // =============================Set Value to Input ============================
  React.useEffect(() => {
    // console.log("viewData::", viewData);

    if (viewData !== null) {
      setFieldValue(
        "national_id",
        viewData?.national_id !== null ? viewData?.national_id : ""
      );
      setFieldValue(
        "employee_id",
        viewData?.employee_id !== null ? viewData?.employee_id : ""
      );
      setFieldValue(
        "working_status",
        viewData?.working_status !== null ? viewData?.working_status : ""
      );
      setFieldValue(
        "position",
        viewData?.position !== null ? viewData?.position : ""
      );
      setFieldValue("shift", viewData?.shift !== null ? viewData?.shift : "");
      setFieldValue("role", viewData?.role);
      setJoinDate(viewData?.join_date);
      setWorkBook(viewData?.work_book);

      if (viewData?.department?.length !== 0) {
        let rows = [];
        viewData?.department?.map((e) => {
          const allRow = {
            affair_id: e?.affair_id?._id,
            office_id: e?.office_id?._id,
            section_id: e?.section_id?._id,
            affair_name: e?.affair_id?.name,
            office_name: e?.office_id?.name,
            section_name: e?.section_id?.name,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setDepartmentList(rows);
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

      if (viewData?.contract?.length !== 0) {
        let rows = [];
        viewData?.contract?.map((e) => {
          const allRow = {
            in_position: e?.in_position,
            start_date: e?.start_date,
            end_date: e?.end_date,
            public_holiday: e?.public_holiday,
            salary: e?.salary,
            annual_leave: e?.annual_leave,
            key: e?.key,
          };
          rows.push(allRow);
        });
        setContractList(rows);
      }

      if (viewData?.work_permit?.length !== 0) {
        let rows = [];
        viewData?.work_permit?.map((e) => {
          const allRow = {
            expire_date: e?.expire_date,
            work_permit_name: e?.work_permit_name,
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
        console.log(response?.data);
        updateEmployee({
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

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: ({ updateEmployee }) => {
      // console.log("updateEmployee::", updateEmployee);
      setOpenSuccess(true);
      setSuccesstMessage(updateEmployee?.message);
      refetch();
      setLoading(false);
      setTimeout(() => {
        navigate(
          `/employee/detailemployee?id=${viewData?._id}&tab=information`
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
    role: Yup.string(),
    employee_id: Yup.string(),
    working_status: Yup.string(),
    position: Yup.string(),
    shift: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      role: "",
      employee_id: "",
      working_status: "working",
      position: "",
      shift: "",
    },

    validationSchema: AddEmployee,
    onSubmit: (values) => {
      setLoading(true);
      //

      let newEmployee = {
        id: viewData?._id,
        role: values?.role,
        employee_id: values?.employee_id,
        working_status: values?.working_status,
        work_book: workBook,
        position: values?.position,
        shift: values?.shift,

        join_date: joinDate,
        department: departmentList,
        insurance: insuranceList,
        contract: contractList,
        work_permit: workPermitList,
      };

      console.log("values::>>>", newEmployee);

      let update = false;
      let newdepartmentList = departmentList;

      if (newdepartmentList?.length !== 0) {
        newdepartmentList?.map((i) => {
          if (
            i.affair_id !== undefined &&
            i.affair_id !== "your department" &&
            i.office_id !== undefined &&
            i.office_id !== "your office" &&
            i.section_id !== undefined &&
            i.section_id !== "your section"
          ) {
            update = true;
          } else {
            update = false;
            setCheckFieldRequried(true);
          }
        });
      } else {
        update = true;
        setCheckFieldRequried(false);
      }

      // console.log("newEmployee>>>>", newEmployee);
      if (imageFile && checkFieldRequired === false && update) {
        uploadImage(imageFile, newEmployee);
      } else {
        if (checkFieldRequired === false && update) {
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
        } else {
          setLoading(false);
          setOpenError(true);
          setErrorMessage("Please input the require field!");
        }
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
          <Typography variant="body">Information Employee update.</Typography>
        </Box>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={6} xl={3}>
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
                                : viewData?.image
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
                </Box>
              </Grid>

              <Grid item xs={12} md={6} xl={5}>
                <Grid item container spacing={2}>
                  <Grid item xs={4}>
                    <Typography className="title-field">Staff ID</Typography>
                    <TextField
                      className="input-field"
                      placeholder="staff id"
                      size="small"
                      {...getFieldProps("employee_id")}
                      error={Boolean(touched.employee_id && errors.employee_id)}
                      helperText={touched.employee_id && errors.employee_id}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <Typography className="title-field">
                      Working status
                    </Typography>
                    <FormControl
                      className="field-select"
                      size="small"
                      sx={{ width: "100%" }}
                    >
                      <Select {...getFieldProps("working_status")} displayEmpty>
                        <MenuItem value="working">
                          <Typography>Working</Typography>
                        </MenuItem>
                        <MenuItem value="resign">
                          <Typography>Resign</Typography>
                        </MenuItem>
                        <MenuItem value="suspend">
                          <Typography>Suspend</Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
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

                  <Grid item xs={4} sx={{ marginTop: "10px" }}>
                    <Grid item container spacing={2}>
                      <Grid item xs={12}>
                        <Typography className="title-field">
                          Join date
                        </Typography>
                        <LocalizationProvider
                          className="date-controll"
                          dateAdapter={AdapterMoment}
                        >
                          <MobileDatePicker
                            value={joinDate}
                            onChange={(e) => setJoinDate(e)}
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
                      <Grid item xs={12}>
                        <Typography className="title-field">
                          Work Book
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="left"
                          sx={{ width: "100%" }}
                        >
                          {/* <Typography>No</Typography> */}
                          <Switch
                            checked={workBook}
                            onChange={(e) => setWorkBook(e.target.checked)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          {/* <Typography>Yes</Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6} xl={4}>
                <Grid item container spacing={1}>
                  <Grid item xs={6}>
                    <Typography className="title-field">
                      Current Position
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="title-field">Shift</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      multiline
                      className="input-field"
                      placeholder="position"
                      size="small"
                      {...getFieldProps("position")}
                      error={Boolean(touched.position && errors.position)}
                      helperText={touched.position && errors.position}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      multiline
                      className="input-field"
                      placeholder="Shift"
                      size="small"
                      {...getFieldProps("shift")}
                      error={Boolean(touched.shift && errors.shift)}
                      helperText={touched.shift && errors.shift}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="title-list-add">
                      Department
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={handleAddDepartment}
                      className="btn-list-icon"
                    >
                      <AddCircleOutlineIcon className="add-list-icon" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <ListDepartment
                      items={departmentList}
                      checkFieldRequired={checkFieldRequired}
                      setUpdateAffairDepartment={setUpdateAffairDepartment}
                      setUpdateOfficeDepartment={setUpdateOfficeDepartment}
                      setUpdateSectionDepartment={setUpdateSectionDepartment}
                      deleteDepartment={deleteDepartment}
                    />
                  </Grid>

                  <Grid item xs={10}>
                    <Typography className="title-list-add">
                      Insurance
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
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

                  <Grid item xs={10}>
                    <Typography className="title-list-add">Contract</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={handleAddContract}
                      className="btn-list-icon"
                    >
                      <AddCircleOutlineIcon className="add-list-icon" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Listcontract
                      items={contractList}
                      setUpdatePositioncontract={setUpdatePositioncontract}
                      setUpdateStartdatecontract={setUpdateStartdatecontract}
                      setUpdateEnddatecontract={setUpdateEnddatecontract}
                      setUpdatePublicholidaycontract={
                        setUpdatePublicholidaycontract
                      }
                      setUpdateSalarycontract={setUpdateSalarycontract}
                      setUpdateAnnualLeavecontract={
                        setUpdateAnnualLeavecontract
                      }
                      deleteContract={deleteContract}
                    />
                  </Grid>

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
