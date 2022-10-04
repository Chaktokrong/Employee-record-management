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
import "./createsection.scss";
import { styled } from "@mui/material/styles";
// formik
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Crop } from "@mui/icons-material";
import CropImageFile from "../CropImage/CropImageFile";

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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//Schema
import { UPDATE_SECTION } from "../../Schema/Section";

// Apolo client
import { useMutation } from "@apollo/client";

//upload image
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";

export default function UserForm({
  officeId,
  editData,
  open,
  handleClose,
  refectSection,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  setRefetchOffice,
}) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  // Updat section
  const [updateSection] = useMutation(UPDATE_SECTION, {
    onCompleted: ({ updateSection }) => {
      console.log(updateSection, "::: updateSection");
      if (updateSection?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateSection?.message);
        refectSection();
        handleClose();
        setLoading(false);
        resetForm();
        setRefetchOffice();
      } else {
        setOpenError(true);
        setErrorMessage(updateSection?.message);
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
  const UpdateSection = Yup.object().shape({
    section_name: Yup.string().required("please input Section name."),
    section_description: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      section_name: editData?.section_name,
      section_description: editData?.section_description,
    },

    validationSchema: UpdateSection,
    onSubmit: (values) => {
      setLoading(true);

      let newSection = {
        id: editData?._id,
        section_name: values?.section_name,
        section_description: values?.section_description,
        in_office: editData?.office_id?._id,
      };

      updateSection({
        variables: {
          input: {
            ...newSection,
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

  React.useEffect(() => {
    if (editData) {
      setFieldValue("section_name", editData?.section_name);
      setFieldValue("section_description", editData?.section_description);
    }
  }, [editData]);

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="section-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Update Section </Stack>
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
                      {" "}
                      Section Name{" "}
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="please update name."
                      {...getFieldProps("section_name")}
                      error={Boolean(
                        touched.section_name && errors.section_name
                      )}
                      helperText={touched.section_name && errors.section_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="field-title">
                      {" "}
                      Description{" "}
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="description"
                      {...getFieldProps("section_description")}
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
