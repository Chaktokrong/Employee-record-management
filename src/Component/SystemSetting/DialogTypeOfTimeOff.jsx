import * as React from "react";
import "./dialogholiday.scss";
import {
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Stack,
  Button,
  IconButton,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//component
import {
  CREATE_TYPE_OF_TIME_OFF,
  UPDATE_TYPE_OF_TIME_OFF,
} from "../../Schema/Setting";
import { useMutation } from "@apollo/client";

export default function DialogTypeOfTimeOff({
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
  // display Radio hook
  const [valuelimit, setValueLimit] = React.useState("Unlimited Use");
  const handleChange = (event) => {
    setValueLimit(event.target.value);
  };

  const [createTypeOfTimeOff] = useMutation(CREATE_TYPE_OF_TIME_OFF, {
    onCompleted: ({ createTypeOfTimeOff }) => {
      if (createTypeOfTimeOff?.status) {
        setSuccesstMessage(createTypeOfTimeOff?.message);
        setOpenSuccess(true);
        setRefetch();
        resetForm();
        handleClose();
      } else {
        setErrorMessage(createTypeOfTimeOff?.message);
        setOpenError(true);
      }
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setOpenError(true);
    },
  });

  const [updateTypeOfTimeOff] = useMutation(UPDATE_TYPE_OF_TIME_OFF, {
    onCompleted: ({ updateTypeOfTimeOff }) => {
      if (updateTypeOfTimeOff?.status) {
        setSuccesstMessage(updateTypeOfTimeOff?.message);
        setOpenSuccess(true);
        setRefetch();
        handleClose();
        resetForm();
      } else {
        setErrorMessage(updateTypeOfTimeOff?.message);
        setOpenError(true);
      }
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setOpenError(true);
    },
  });

  // formik user
  const AddPublicHoliday = Yup.object().shape({
    type_name: Yup.string().required(),
    deduct: Yup.number().required(),
    male_use_able: Yup.number().required(),
    female_use_able: Yup.number().required(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      type_name: "",
      limit: "Unlimited Use",
      male_use_able: 0,
      deduct_option: "No deduct",
      deduct: 0,
      female_use_able: 0,
      remark: "",
    },

    validationSchema: AddPublicHoliday,
    onSubmit: (values) => {
      console.log("values", values);
      if (title === "Create") {
        createTypeOfTimeOff({
          variables: {
            input: {
              ...values,
            },
          },
        });
      } else {
        updateTypeOfTimeOff({
          variables: {
            id: row?._id,
            input: {
              type_name: values?.type_name,
              limit: values?.limit,
              male_use_able: values?.male_use_able,
              deduct_option: values?.deduct_option,
              deduct: values?.deduct,
              female_use_able: values?.female_use_able,
              remark: values?.remark,
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
    resetForm,
    values,
  } = formik;

  React.useEffect(() => {
    if (row) {
      setFieldValue("type_name", row?.type_name);
      setFieldValue("limit", row?.limit);
      setFieldValue("male_use_able", row?.male_use_able);
      setFieldValue("deduct_option", row?.deduct_option);
      setFieldValue("deduct", row?.deduct);
      setFieldValue("female_use_able", row?.female_use_able);
      setFieldValue("remark", row?.remark);
    }
  }, [row]);

  //
  return (
    <Dialog open={open} className="dialog-holiday-create">
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" spacing={2}>
          {title === "Create" ? (
            <Typography className="header-title" mt={1}>
              CREATE TYPE OF TIME OFF
            </Typography>
          ) : (
            <Typography className="header-title" mt={1}>
              UPDATE TYPE OF TIME OFF
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <DoDisturbOnOutlinedIcon className="close-icon" />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 1 }} />
      </DialogTitle>

      <DialogContent>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack direction="column" spacing={1} mt={1}>
              <Typography className="title-text-field">Type Name</Typography>
              <TextField
                size="small"
                multiline
                fullWidth
                placeholder="Type Name"
                {...getFieldProps("type_name")}
                error={Boolean(touched.type_name && errors.type_name)}
                helperText={touched.type_name && errors.type_name}
              />
            </Stack>

            <Stack direction="row" spacing={1} mt={1}>
              <Stack direction="column" spacing={1} width="50%">
                <Typography className="title-text-field">Deduct</Typography>

                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  placeholder="number"
                  {...getFieldProps("deduct")}
                  error={Boolean(touched.deduct && errors.deduct)}
                  helperText={touched.deduct && errors.deduct}
                />
              </Stack>

              <Stack direction="column" spacing={1} width="50%">
                <Typography className="title-text-field">
                  Deduct Option
                </Typography>

                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    size="small"
                    value={values?.deduct_option}
                    onChange={(e) => {
                      setFieldValue("deduct_option", e.target.value);
                    }}
                  >
                    <MenuItem value="No deduct">No deduct</MenuItem>
                    <MenuItem value="Salary Base">Salary Base</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1} mt={1}>
              <Stack direction="column" spacing={1} width="55%">
                <FormControl>
                  <Typography className="title-text-field">
                    Choose Limit
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={valuelimit}
                    onChange={handleChange}
                    {...getFieldProps("limit")}
                  >
                    <FormControlLabel
                      value="Limited Use"
                      control={<Radio />}
                      label="Limited Use"
                    />
                    <FormControlLabel
                      value="Unlimited Use"
                      control={<Radio />}
                      label="Unlimited Use"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={1} mt={1} width="45%">
                <Stack direction="column" spacing={1}>
                  <Typography className="title-text-field">
                    Male Use Able{" "}
                  </Typography>
                  <Stack direction="row">
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      placeholder="number"
                      {...getFieldProps("male_use_able")}
                      error={Boolean(
                        touched.male_use_able && errors.male_use_able
                      )}
                      helperText={touched.male_use_able && errors.male_use_able}
                    />
                  </Stack>
                </Stack>

                <Stack direction="column" spacing={1}>
                  <Typography className="title-text-field">
                    Female Use Able
                  </Typography>
                  <Stack direction="row">
                    <TextField
                      size="small"
                      type="number"
                      fullWidth
                      placeholder="number"
                      {...getFieldProps("female_use_able")}
                      error={Boolean(
                        touched.female_use_able && errors.female_use_able
                      )}
                      helperText={
                        touched.female_use_able && errors.female_use_able
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack direction="column" spacing={1} mt={1}>
              <Typography className="title-text-field">Remark</Typography>
              <TextField
                size="small"
                multiline
                rows={3}
                fullWidth
                placeholder="remark"
                {...getFieldProps("remark")}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid container>
            <Grid item xs={12}>
              <Button className="create-btn-timeoff" onClick={handleSubmit}>
                {title}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
