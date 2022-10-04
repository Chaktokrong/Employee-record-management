import React, { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Autocomplete,
  Avatar,
  Switch,
  IconButton,
  TableContainer,
  Table,
} from "@mui/material";
import "./createcalendar.scss";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//Dialog
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Divider } from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
// Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// Icons
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
//Schema
import { useMutation } from "@apollo/client";
//components
import ListTopic from "./ListTopic";
import SelectUsers from "./SelectUsers";

export default function CreateCalendar({
  handleDelete,
  values,
  open,
  handleClose,
  setStorageData,
  setValues,
  storageData,
  startDate,
  endDate,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [allDay, setAllDay] = useState(false);
  const [asignPeople, setAsignPeople] = useState([]);

  // const [createEvent, { data, error, loading, refetch }] = useMutation(
  //   CREATE_EVENTS,
  //   {
  //     onCompleted: ({ updateUser }) => {
  //       console.log(updateUser, "update users");
  //       // if (updateUser?.success === true) {
  //       //   setOpenSuccess(true);
  //       //   setSuccesstMessage(updateUser?.message);
  //       //   handleClose();
  //       //   setLoading(true);
  //       // } else {
  //       //   setOpenError(true);
  //       //   setErrorMessage(updateUser?.message);
  //       // }
  //     },

  //     onError: (error) => {
  //       console.log(error.message, "error message");
  //     },
  //   }
  // );

  const handleTitle = (e) => {
    setValues({
      ...values,
      title: e.target.value,
      // start: startData,
      // end: endData,
    });
  };

  const handleDescription = (e) => {
    setValues({ ...values, description: e.target.value });
  };

  const handleChairman = (e) => {
    setValues({ ...values, chairman: e });
  };

  const handleStart = (e) => {
    // 2022-09-06T08:59:00.000Z
    console.log("e::>>", e);
    setValues({ ...values, start: startDate + "T" + e + ":00.000Z" });
  };

  const handleEnd = (e) => {
    setValues({ ...values, end: endDate + "T" + e + ":00.000Z" });
  };

  const handleCheckDay = (e) => {
    setAllDay(e.target.checked);
    setValues({ ...values, allDay: allDay });
  };

  const handleLocation = (e) => {
    setValues({ ...values, venue: e });
  };

  console.log("values::->", values);

  // const handleSubmit = (values) => {
  //   let removeTitleObj = asignPeople?.map(function (item) {
  //     delete item.title;
  //     return item;
  //   });
  //   console.log("asignPeople::->", removeTitleObj);
  //   createEvent({
  //     variables: {
  //       ...values,
  //       participants: removeTitleObj,
  //       color: "purple",
  //     },
  //   });
  //   console.log("values::->", values);
  //   setStorageData({
  //     ...values,
  //     color: "purple",
  //   });
  //   handleClose();
  // };

  // Buy product
  const [currentItem, setCurrentItem] = useState({
    text: "",
    qty: 0,
    supplies: "",
    key: "",
  });
  const [item, setItem] = useState([]);

  const handleAddTopic = () => {
    setCurrentItem({
      text: "default",
      qty: 1,
      supplies: "ជ្រើសរើស",
      key: Date.now(),
    });
  };

  React.useMemo(async () => {
    await handleAddTopic();
    await addItem();
  }, []);

  const addItem = () => {
    const newItem = currentItem;
    if (newItem.text !== "") {
      const items = [...item, newItem];
      setItem([...items]);
      setCurrentItem({ text: "", qty: 0, supplies: "", key: "" });
    }
  };

  React.useEffect(() => {
    if (currentItem?.text !== "") {
      addItem();
    }
  }, [currentItem]);

  const deleteItem = (key) => {
    const filteredItems = item?.filter((t) => t.key !== key);
    setItem(filteredItems);
  };

  const setUpdateText = (text, key) => {
    const items = item;
    items.map((i) => {
      if (i.key === key) {
        console.log(i.key + "  " + key);
        i.text = text;
      }
    });
    setItem([...items]);
  };

  const setUpdateQty = (qty, key) => {
    const items = item;
    items.map((i) => {
      if (i.key === key) {
        console.log(i.key + "  " + key);
        i.qty = qty;
      }
    });
    setItem([...items]);
  };

  const setUpdateSupplies = (supplies, key) => {
    const items = item;
    items.map((i) => {
      if (i.key === key) {
        console.log(i.key + "  " + key);
        i.supplies = supplies;
      }
    });
    setItem([...items]);
  };
  // End Buy product

  const chairmanData = [
    { label: "Lok Lundy" },
    { label: "Vet Sreymoa" },
    { label: "Khlok Thavan" },
    { label: "Meach Manut" },
    { label: "Theang Rathana" },
  ];

  const locationData = [
    { label: "A04" },
    { label: "A05" },
    { label: "A06" },
    { label: "A07" },
    { label: "A08" },
    { label: "A09" },
    { label: "A10" },
  ];

  // Create User
  //   const [createUser] = useMutation(CREATE_USER, {
  //     onCompleted: ({ createUser }) => {
  //       // console.log(createUser, "::: createUser");
  //       if (createUser?.status === true) {
  //         setOpenSuccess(true);
  //         setSuccesstMessage(createUser?.message);
  //         setRefetch();
  //         handleClose();
  //         setLoading(false);
  //         resetForm();
  //       } else {
  //         setOpenError(true);
  //         setErrorMessage(createUser?.message);
  //         setLoading(false);
  //       }
  //     },
  //     onError: (error) => {
  //       setOpenError(true);
  //       setLoading(false);
  //       setErrorMessage(error.message);
  //     },
  //   });

  // formik user
  const AddUser = Yup.object().shape({
    first_name: Yup.string().required("First Name is required!"),
    last_name: Yup.string().required("Last Name is required!"),
    email: Yup.string().required("Email is required!"),
    position: Yup.string().required("position is required!"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      position: "",
    },

    validationSchema: AddUser,
    onSubmit: (values) => {
      // console.log(values, ":: values");
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    // values,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} className="calendar-dialog">
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">Create Calendar</Typography>
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
                <Grid item container spacing={3}>
                  <Grid item xs={12}>
                    <Typography className="field-title">Type</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="meeting"
                      onChange={(e) => handleStart(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="field-title"> Start date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        value={startDate}
                        // onChange={(newValue) => {
                        //   setStartDate(newValue);
                        // }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="field-title"> Start date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        value={endDate}
                        // onChange={(newValue) => {
                        //   setStartDate(newValue);
                        // }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" fullWidth />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="field-title">Chairman</Typography>
                    <Autocomplete
                      disablePortal
                      onChange={(e, value) => handleChairman(value.label)}
                      options={chairmanData}
                      renderInput={(params) => (
                        <TextField {...params} size="small" fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="field-title">Members</Typography>
                    <SelectUsers setAsignPeople={setAsignPeople} />
                  </Grid>

                  <Grid item xs={10}>
                    <Typography className="field-list-title">Topic</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={handleAddTopic}
                      className="btn-list-icon"
                    >
                      <AddCircleOutlineIcon className="add-list-icon" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <ListTopic
                      items={item}
                      deleteItem={deleteItem}
                      setUpdateText={setUpdateText}
                      setUpdateQty={setUpdateQty}
                      setUpdateSupplies={setUpdateSupplies}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="field-list-title">Agenda</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={handleAddTopic}
                      className="btn-list-icon"
                    >
                      <AddCircleOutlineIcon className="add-list-icon" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <ListTopic
                      items={item}
                      deleteItem={deleteItem}
                      setUpdateText={setUpdateText}
                      setUpdateQty={setUpdateQty}
                      setUpdateSupplies={setUpdateSupplies}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="field-title">Note</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      placeholder="Description"
                      onChange={(e) => handleDescription(e)}
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
