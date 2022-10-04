import * as React from "react";
import "./createposition.scss";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Button,
  IconButton,
  Divider,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

export default function CreateOffice({ open, handleClose, title }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  // formik user
  const AddPublicHoliday = Yup.object().shape({
    position_name: Yup.string().required(),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      position_name: "",
      head_office: "select",
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
            <Stack className="header-title">CREATE OFFICE</Stack>
          ) : (
            <Stack className="header-title">UPDATE OFFICE</Stack>
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
                  Office Name
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="office name"
                  {...getFieldProps("office_name")}
                />
              </Stack>

              <Stack direction="column" spacing={1} mt={1}>
                <Typography className="title-text-field">
                  Head Office
                </Typography>
                <FormControl sx={{ m: 1 }}>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    size="small"
                    value={personName}
                    onChange={handleChange}
                    {...getFieldProps("head_office")}
                    defaultValue={"Placeholder"}
                  >
                    <MenuItem disabled value="">
                      <em>Placeholder</em>
                    </MenuItem>
                    <MenuItem value="finance">Finance Office</MenuItem>
                    <MenuItem value="human">Human Office</MenuItem>
                    <MenuItem value="it">IT Office</MenuItem>
                  </Select>
                </FormControl>
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
