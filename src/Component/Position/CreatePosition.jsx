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
  Avatar,
  Switch,
  FormControlLabel,
  Modal,
  InputAdornment,
  Badge,
  IconButton,
  Divider,
} from "@mui/material";
import "./createposition.scss";
import { styled } from "@mui/material/styles";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Crop } from "@mui/icons-material";
import CropImageFile from "../CropImage/CropImageFile";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//Dialog
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// Icons
import ClearIcon from "@mui/icons-material/Clear";
//Schema
import { CREATE_SECTION } from "../../Schema/Section";
import { CREATE_JOB_TITLE, UPDATE_JOB_TITLE } from "../../Schema/JobTitle";
// Apolo client
import { useMutation } from "@apollo/client";

export default function CreatePosition({
  open,
  editData,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  title,
}) {
  const [loading, setLoading] = useState(false);

  // Create User
  const [createJobTitle] = useMutation(CREATE_JOB_TITLE, {
    onCompleted: ({ createJobTitle }) => {
      console.log(createJobTitle, "::: createJobTitle");
      if (createJobTitle?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(createJobTitle?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(createJobTitle?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  // Create User
  const [updateJobTitle] = useMutation(UPDATE_JOB_TITLE, {
    onCompleted: ({ updateJobTitle }) => {
      console.log(updateJobTitle, "::: updateJobTitle");
      if (updateJobTitle?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(updateJobTitle?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(updateJobTitle?.message);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
      setLoading(false);
    },
  });

  // formik section
  const AddSection = Yup.object().shape({
    name: Yup.string().required("please input Section name."),
    description: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: AddSection,
    onSubmit: (values) => {
      // console.log(values, "<<<<<< values");
      setLoading(true);
      if (title === "Create") {
        createJobTitle({
          variables: {
            ...values,
          },
        });
      } else {
        updateJobTitle({
          variables: {
            updateJobTitleId: editData?._id,
            ...values,
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

  React.useEffect(() => {
    if (editData) {
      setFieldValue("name", editData?.name);
      setFieldValue("description", editData?.description);
    }
  }, [editData]);

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="position-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> {title} Position </Stack>
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
                    <Typography className="field-title">
                      Position Name
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="position name"
                      {...getFieldProps("name")}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="field-title">Description</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="description"
                      {...getFieldProps("description")}
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
                  {title}
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
