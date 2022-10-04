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
import {
  CREATE_PUBLIC_HOLIDAY,
  UPDATE_PUBLIC_HOLIDAY,
} from "../../Schema/Setting";
import { useMutation } from "@apollo/client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DateRangeIcon from "@mui/icons-material/DateRange";
import moment from "moment";

export default function DialogHoliday({
  row,
  open,
  handleClose,
  title,
  setRefectch,
  MonthofYear,
  monthSeleced,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  //

  const [loading, setLoading] = React.useState(false);
  //
  const [createPublicHoliday] = useMutation(CREATE_PUBLIC_HOLIDAY, {
    onCompleted: ({ createPublicHoliday }) => {
      console.log(createPublicHoliday);
      if (createPublicHoliday?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(createPublicHoliday?.message);
        setRefectch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(createPublicHoliday?.message);
        setErrorMessage(true);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error?.message);
      setLoading(false);
    },
  });

  //update public holiday
  const [updatePublicHoliday] = useMutation(UPDATE_PUBLIC_HOLIDAY, {
    onCompleted: ({ updatePublicHoliday }) => {
      if (updatePublicHoliday?.status) {
        setOpenSuccess(true);
        setSuccesstMessage(updatePublicHoliday?.message);
        setRefectch();
        handleClose();
        setLoading(false);
        resetForm();
      } else {
        setOpenError(updatePublicHoliday?.message);
        setErrorMessage(true);
        setLoading(false);
      }
    },
    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error?.message);
      setLoading(false);
    },
  });

  // formik user
  const AddPublicHoliday = Yup.object().shape({
    holiday_name: Yup.string().required(),
    holiday_date: Yup.date().required(),
    in_month: Yup.string(),
    remark: Yup.string(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      holiday_name: "",
      holiday_date: "",
      in_month: monthSeleced,
      remark: "",
    },

    validationSchema: AddPublicHoliday,

    onSubmit: (values) => {
      setLoading(true);

      if (title === "Create") {
        createPublicHoliday({
          variables: {
            input: {
              ...values,
            },
          },
        });
      } else {
        updatePublicHoliday({
          variables: {
            input: {
              id: row?._id,
              ...values,
            },
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
    if (row) {
      setFieldValue("holiday_name", row?.holiday_name);
      setFieldValue("holiday_date", row?.holiday_date);
      setFieldValue("in_month", monthSeleced);
      setFieldValue("remark", row?.remark ? row?.remark : " ");
    }
  }, [row]);

  React.useEffect(() => {
    MonthofYear?.map((row, index) => {
      if (monthSeleced === row) {
        setFieldValue(
          "holiday_date",
          moment(`${moment(new Date()).format("YYYY")}-${index + 1}-01`).format(
            "DD-MMM-YYYY"
          )
        );
      }
    });
  }, [monthSeleced, open]);

  return (
    <Dialog className="dialog-holiday-create" open={open}>
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" justifyContent="center">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-title">
              {title} Public Holiday
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
                    Holiday Name
                  </Typography>
                  <TextField
                    size="small"
                    multiline
                    fullWidth
                    placeholder="holiday"
                    {...getFieldProps("holiday_name")}
                    error={Boolean(touched.holiday_name && errors.holiday_name)}
                    helperText={touched.holiday_name && errors.holiday_name}
                  />
                </Stack>

                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">
                    Holiday Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      value={values?.holiday_date}
                      onChange={(newValue) => {
                        setFieldValue("holiday_date", newValue);
                      }}
                      error={Boolean(
                        touched.holiday_date && errors.holiday_date
                      )}
                      helperText={touched.holiday_date && errors.holiday_date}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          className="text-field"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <DateRangeIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack
                  direction="column"
                  justifyContent="center"
                  sx={{ width: "400px" }}
                >
                  <Typography className="title-text-field">Remark</Typography>
                  <TextField
                    size="small"
                    multiline
                    fullWidth
                    placeholder="remark"
                    {...getFieldProps("remark")}
                    // error={Boolean(touched.remark && errors.remark)}
                    // helperText={touched.remark && errors.remark}
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
              ) : moment(values?.holiday_date).format("MMMM") ===
                monthSeleced ? (
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  className="create-btn-holiday"
                >
                  {title}
                </Button>
              ) : (
                <Button
                  fullWidth
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
