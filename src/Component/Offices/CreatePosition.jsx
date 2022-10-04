import * as React from "react";
import "./createposition.scss";
import {
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Button,
  IconButton,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

export default function CreatePosition({ open, handleClose, title }) {
  // formik user
  const AddPublicHoliday = Yup.object().shape({
    position: Yup.string().required(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      position: "",
    },

    validationSchema: AddPublicHoliday,
    onSubmit: (values) => {
      console.log("values", values);
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

  return (
    <Dialog open={open} className="create-position">
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row">
          {title === "Create" ? (
            <Stack className="header-title">CREATE POSITION</Stack>
          ) : (
            <Stack className="header-title">UPDATE POSITION</Stack>
          )}
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
        <DialogContentText id="alert-dialog-title">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack direction="column" spacing={1} mt={1}>
                <Typography className="title-text-field">
                  Position Name
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="position name"
                  {...getFieldProps("position")}
                />
              </Stack>
              <Stack direction="column" spacing={1} sx={{ mt: 2 }}></Stack>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid container>
            <Grid item xs={12}>
              <Button className="create-btn" fullWidth type="submit">
                {title}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
