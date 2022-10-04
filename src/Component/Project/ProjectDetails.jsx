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
import { GET_QUERY_DEPARTMENT } from "../../Schema/Departement";
import { UPDATE_PROJECT } from "../../Schema/Project";
import SelectUsers from "./SelectUsers";
import ListTasks from "./ListTasks";
import ListActivity from "./ListActivity";
import UpdateListTasks from "./UpdateListTasks";
import UpdateListActivity from "./UpdateListActivity";

export default function ProjectDetails({
  open,
  editData,
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

  console.log("editData:::", editData);

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

  // ========================== List tasks =================================
  const [currentActivity, setCurrentActivity] = useState({
    action_by: "",
    description: "",
    created_at: "",
  });

  const [activityList, setActivityList] = useState([]);

  const handleAddActivity = () => {
    setCurrentActivity({
      action_by: "add task",
      description: false,
      created_at: Date.now(),
    });
  };

  React.useMemo(async () => {
    await handleAddActivity();
    await addActivity();
  }, []);

  const addActivity = () => {
    const newItem = currentActivity;
    if (newItem.action_by !== "") {
      const items = [...activityList, newItem];
      setActivityList([...items]);
      setCurrentActivity({ action_by: "", description: false, created_at: "" });
    }
  };

  React.useEffect(() => {
    if (currentActivity?.action_by !== "") {
      addActivity();
    }
  }, [currentActivity]);

  const deleteActivity = (created_at) => {
    const filteredItems = activityList?.filter(
      (t) => t.created_at !== created_at
    );
    setActivityList(filteredItems);
  };

  const setUpdateDescription = (description, created_at) => {
    const items = activityList;
    items.map((i) => {
      if (i.created_at === created_at) {
        console.log(i.created_at + "  " + created_at);
        i.description = description;
      }
    });
    setActivityList([...items]);
  };

  //=============================== Select Department =========================================
  const [departmentName, setDepartmentName] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentSelected, setDepartmentSelected] = useState();

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
    setDepartmentSelected(newValue);
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

  useEffect(() => {
    setFieldValue("title", editData?.title);
    setFieldValue("description", editData?.description);
    setFieldValue("priority", editData?.priority);
    setFieldValue("start_date", editData?.start_date);
    setFieldValue("end_date", editData?.end_date);

    if (editData?.labels) {
      let rows = [];
      editData?.labels?.map((e) => {
        const allRow = {
          id: e?._id,
          title: e?.affair_name,
        };
        const updateRow = e?._id;
        rows.push(allRow);
        setDepartmentOptions(rows);
        setDepartmentName(updateRow);
      });
    }

    if (editData?.asign_to) {
      let rows = [];
      editData?.asign_to?.map((e) => {
        const allRow = {
          id: e?._id,
          title: e?.latin_name?.first_name + " " + e?.latin_name?.last_name,
          image: e?.image?.src,
        };
        rows.push(allRow);
        setAsignPeople(rows);
      });
    }

    if (editData?.tasks) {
      let rows = [];
      editData?.tasks?.map((e) => {
        const allRow = {
          title: e?.title,
          complete: e?.complete,
          created_at: e?.created_at,
        };
        rows.push(allRow);
        setTasksList(rows);
      });
    }
  }, [editData]);

  // console.log("asignPeopleId>>>", asignPeopleId);

  //   const [updateProject, { data, loading, error }] = useMutation(
  //     UPDATE_PROJECT,
  //     {
  //       onCompleted: ({ updateProject }) => {
  //         if (updateProject?.success === true) {
  //           setOpenSuccess(true);
  //           setSuccesstMessage(updateProject?.message);
  //           setRefetch();
  //         } else {
  //           setOpenError(true);
  //           setErrorMessage(updateProject?.message);
  //         }
  //       },

  //       onError: (error) => {
  //         // console.log(error.message, "error message");
  //         setOpenError(true);
  //         setErrorMessage(error.message);
  //       },
  //     }
  //   );

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
        id: editData?._id,
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
      // updateProject({
      //   variables: {
      //     input: {
      //       ...newValue,
      //     },
      //   },
      // });
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
                    value={departmentSelected}
                    getOptionLabel={(option) => option.title}
                    onChange={handleTypeDepartment}
                    getOptionSelected={(option, value) =>
                      option?.id === value?.id
                    }
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
                  <UpdateListTasks
                    items={tasksList}
                    deleteTasks={deleteTasks}
                    setUpdateTitle={setUpdateTitle}
                  />
                </Grid>

                <Grid item xs={10.5}>
                  <Typography className="title-list-add">Activity</Typography>
                </Grid>
                <Grid item xs={1.5}>
                  <IconButton
                    onClick={handleAddActivity}
                    className="btn-list-icon"
                  >
                    <AddCircleOutlineIcon className="add-list-icon" />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <UpdateListActivity
                    items={activityList}
                    deleteActivity={deleteActivity}
                    setUpdateDescription={setUpdateDescription}
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
              <Button className="btn-create" onClick={handleSubmit}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
