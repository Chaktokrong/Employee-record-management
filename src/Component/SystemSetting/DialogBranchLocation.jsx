import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Stack,
  Box,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import "./dialogholiday.scss";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { CREATE_BRANCH, UPDATE_BRANCH } from "../../Schema/Setting";
import { useMutation } from "@apollo/client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DateRangeIcon from "@mui/icons-material/DateRange";

export default function DialogBranchLocation({
  row,
  open,
  handleClose,
  title,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [loading, setLoading] = React.useState(false);
  const [createBranch] = useMutation(CREATE_BRANCH, {
    onCompleted: ({ createBranch }) => {
      if (createBranch?.status) {
        setSuccesstMessage(createBranch?.message);
        setOpenSuccess(true);
        setRefetch();
        handleClose();
        // resetForm();
        setLoading(false);
      } else {
        setErrorMessage(createBranch?.message);
        setOpenError(true);
        setLoading(false);
      }
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setOpenError(true);
      setLoading(false);
    },
  });

  const [updateBranch] = useMutation(UPDATE_BRANCH, {
    onCompleted: ({ updateBranch }) => {
      console.log(updateBranch);
      if (updateBranch?.status) {
        setSuccesstMessage(updateBranch?.message);
        setOpenSuccess(true);
        setRefetch();
        handleClose();
        // resetForm();
        setLoading(false);
      } else {
        setErrorMessage(updateBranch?.message);
        setOpenError(true);
        setLoading(false);
      }
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setOpenError(true);
      setLoading(false);
    },
  });
  // formik user
  const AddLocation = Yup.object().shape({
    branch_name: Yup.string().required(),
    description: Yup.string(),
    longitude: Yup.string().required(),
    latitude: Yup.string().required(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      branch_name: row?.branch_name,
      description: row?.description,
      longitude: row?.longitude,
      latitude: row?.latitude,
    },

    validationSchema: AddLocation,
    onSubmit: (values) => {
      setLoading(true);
      if (title === "Create") {
        createBranch({
          variables: {
            input: {
              ...values,
            },
          },
        });
      } else {
        updateBranch({
          variables: {
            updateBranchId: row?._id,
            input: {
              branch_name: values?.branch_name,
              description: values?.description,
              longitude: values?.longitude,
              latitude: values?.latitude,
            },
          },
        });
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values, resetForm } =
    formik;

  return (
    <Dialog className="dialog-holiday-create" open={open}>
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">
              {title} Branch Name and Location
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
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ mb: "20px" }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">
                    Branch Name
                  </Typography>

                  <TextField
                    size="small"
                    multiline
                    fullWidth
                    placeholder="Branch name"
                    {...getFieldProps("branch_name")}
                    error={Boolean(touched.branch_name && errors.branch_name)}
                    helperText={touched.branch_name && errors.branch_name}
                  />
                </Stack>

                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">
                    Description
                  </Typography>
                  <TextField
                    size="small"
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="description"
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>

                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">latitude</Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="latitude"
                    {...getFieldProps("latitude")}
                    error={Boolean(touched.latitude && errors.latitude)}
                    helperText={touched.latitude && errors.latitude}
                  />
                </Stack>

                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">
                    longitude
                  </Typography>
                  <TextField
                    size="small"
                    multiline
                    fullWidth
                    placeholder="longitude"
                    {...getFieldProps("longitude")}
                    error={Boolean(touched.longitude && errors.longitude)}
                    helperText={touched.longitude && errors.longitude}
                  />
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid container>
            <Grid item xs={12}>
              {loading ? (
                <Button
                  fullWidth
                  variant="contained"
                  className="create-btn-holiday"
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  className="create-btn-holiday"
                >
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
