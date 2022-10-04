import React, { useEffect, useState } from "react";
import "./createtasks.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
//compoments
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useMutation, useQuery } from "@apollo/client";
//components
import { CREATE_PROJECT } from "../../Schema/Project";
import { GET_QUERY_DEPARTMENT } from "../../Schema/Departement";
import SelectUsers from "./SelectUsers";
import SelectDepartment from "./SelectDepartment";
import ListTasks from "./ListTasks";

export default function FormProject({
  open,
  setRefetch,
  handleClose,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  const [asignPeople, setAsignPeople] = useState([]);
  const [asignPeopleId, setAsignPeopleId] = useState([]);
  const [asignDepartment, setAsignDepartment] = useState([]);
  const [loading, setLoading] = useState(false);

  // ========================== List tasks =================================
  const [currentTasks, setCurrentTasks] = useState({
    title: "",
    complete: "",
    created_at: "",
  });
  const [tasksList, setTasksList] = useState([]);

  const handleAddTasks = () => {
    setCurrentTasks({
      title: "add task",
      complete: false,
      created_at: Date.now(),
    });
  };

  React.useMemo(async () => {
    await handleAddTasks();
    await addItem();
  }, []);

  const addItem = () => {
    const newItem = currentTasks;
    if (newItem.title !== "") {
      const items = [...tasksList, newItem];
      setTasksList([...items]);
      setCurrentTasks({ title: "", complete: false, created_at: "" });
    }
  };

  React.useEffect(() => {
    if (currentTasks?.title !== "") {
      addItem();
    }
  }, [currentTasks]);

  const deleteTasks = (created_at) => {
    const filteredItems = tasksList?.filter((t) => t.created_at !== created_at);
    setTasksList(filteredItems);
  };

  const setUpdateTitle = (title, created_at) => {
    const items = tasksList;
    items.map((i) => {
      if (i.created_at === created_at) {
        console.log(i.created_at + "  " + created_at);
        i.title = title;
      }
    });
    setTasksList([...items]);
  };

  //=============================== Select Department =========================================
  const [departmentName, setDepartmentName] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  // console.log("departmentName::", departmentName);

  const { data: departmentData } = useQuery(GET_QUERY_DEPARTMENT, {
    variables: {
      keyword: "",
    },
    onCompleted: ({ getAffair }) => {
      // console.log("getAffair>>>", getAffair);
      let rows = [];
      getAffair?.map((e) => {
        const allRow = {
          id: e?._id,
          title: e?.affair_name,
        };
        rows.push(allRow);
      });
      setDepartmentOptions(rows);
    },
    onError: (error) => {
      // console.log(error);
      setDepartmentOptions([]);
    },
  });

  const handleTypeDepartment = (event, newValue) => {
    // console.log("newValue:::", newValue);
    let rows = [];
    newValue?.map((e) => {
      const allRow = e?.id;
      rows.push(allRow);
    });
    setDepartmentName(rows);
  };

  //=============================== Set assign team id ======================================

  useEffect(() => {
    let rows = [];
    asignPeople?.map((e) => {
      const allRow = e?.id;
      rows.push(allRow);
    });
    setAsignPeopleId(rows);
  }, [asignPeople]);

  // console.log("asignPeopleId>>>", asignPeopleId);

  const [addProject, { data, error }] = useMutation(CREATE_PROJECT, {
    onCompleted: ({ addProject }) => {
      // console.log("addProject>>>", addProject);
      if (addProject?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(addProject?.message);
        setRefetch();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(addProject?.message);
        setLoading(false);
      }
    },

    onError: (error) => {
      // console.log(error.message, "error message");
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  const ProjectSchema = Yup.object().shape({
    title: Yup.string().required("Field is Required"),
    description: Yup.string(),
    priority: Yup.string().required("Field is Required"),
    start_date: Yup.date(),
    end_date: Yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "Urgent",
      start_date: new Date(),
      end_date: new Date(),
    },
    validationSchema: ProjectSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newValue = {
        ...values,
        title: values?.title,
        description: values?.description,
        priority: values?.priority,
        labels: departmentName,
        asign_to: asignPeopleId,
        start_date: values?.start_date,
        end_date: values?.end_date,
        tasks: tasksList,
      };

      // console.log("newValue>>>", newValue);
      setLoading(true);
      addProject({
        variables: {
          input: {
            ...newValue,
          },
        },
      });
    },
  });

  const handleStartDate = (newValue) => {
    setFieldValue("start_date", newValue);
  };

  const handleEndDate = (newValue) => {
    setFieldValue("end_date", newValue);
  };

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  return (
    <Dialog open={open} className="tasks-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">Create Tasks</Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
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
              <Grid item container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12}>
                  <TextField
                    className="field-input"
                    fullWidth
                    size="small"
                    placeholder="Project Title"
                    {...getFieldProps("title")}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="field-input-des"
                    size="small"
                    fullWidth
                    multiline
                    placeholder="Description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography className="field-title">Asign Team</Typography>
                  <SelectUsers setAsignPeople={setAsignPeople} />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="field-title">Department</Typography>
                  <Autocomplete
                    multiple
                    id="size-small-outlined-multi"
                    size="small"
                    options={departmentOptions}
                    getOptionLabel={(option) => option.title}
                    onChange={handleTypeDepartment}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {/* <SelectDepartment setAsignDepartment={setAsignDepartment} /> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography className="field-title">Progress</Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      {...getFieldProps("priority")}
                      error={Boolean(touched.priority && errors.priority)}
                      size="small"
                    >
                      <MenuItem value="Urgent">Urgent</MenuItem>
                      <MenuItem value="Important">Important</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography className="field-title">Priority</Typography>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      {...getFieldProps("priority")}
                      error={Boolean(touched.priority && errors.priority)}
                      size="small"
                    >
                      <MenuItem value="Urgent">Urgent</MenuItem>
                      <MenuItem value="Important">Important</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography className="field-title">Start date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      value={values?.start_date}
                      onChange={handleStartDate}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          type="date"
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography className="field-title">End date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      value={values?.end_date}
                      onChange={handleEndDate}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          type="date"
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={10.5}>
                  <Typography className="title-list-add">Tasks</Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <IconButton
                    onClick={handleAddTasks}
                    className="btn-list-icon"
                  >
                    <AddCircleOutlineIcon className="add-list-icon" />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <ListTasks
                    items={tasksList}
                    deleteTasks={deleteTasks}
                    setUpdateTitle={setUpdateTitle}
                    // checkFieldRequired={checkFieldRequired}
                  />
                </Grid>
              </Grid>
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
