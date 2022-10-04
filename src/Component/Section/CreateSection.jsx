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

// Apolo client
import { useMutation } from "@apollo/client";

export default function CreateSection({
  officeId,
  openSection,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  // Create User
  const [createSection] = useMutation(CREATE_SECTION, {
    onCompleted: ({ createSection }) => {
      console.log(createSection, "::: createSection");
      if (createSection?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(createSection?.message);
        setRefetch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(true);
        setErrorMessage(createSection?.message);
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
    section_name: Yup.string().required("please input Section name."),
    section_description: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      section_name: "",
      section_description: "",
    },

    validationSchema: AddSection,
    onSubmit: (values) => {
      // console.log(values, "<<<<<< values");
      setLoading(true);
      createSection({
        variables: {
          input: {
            ...values,
            in_office: officeId,
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

  return (
    <Dialog
      open={openSection}
      aria-labelledby="responsive-dialog-title"
      className="section-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Create Section </Stack>
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
                      Section Name
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="sectoin name"
                      {...getFieldProps("section_name")}
                      error={Boolean(
                        touched.section_name && errors.section_name
                      )}
                      helperText={touched.section_name && errors.section_name}
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
