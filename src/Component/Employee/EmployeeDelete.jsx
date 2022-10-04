import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./EmployeeDelete.scss";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

import { useMutation } from "@apollo/client";

//schema
import { DELETE_EMPLOYEE } from "../../Schema/Employee";

export default function ModalDeleteStorageRoom({
  handleClose,
  Datarow,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  employeeid,
  open,
}) {
  // console.log(employeeid,"employee_ID");

  const [loading, setLoading] = React.useState(false);
  const [valueVoid, setValueVoid] = React.useState("");
  //delete Employee
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: ({ deleteEmployee }) => {
      console.log("deleteEmployee::", deleteEmployee);
      if (deleteEmployee?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteEmployee?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(deleteEmployee?.message);
        setLoading(false);
      }
    },
    oneError: ({ error }) => {
      console.log(error.massage);
      setLoading(false);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteEmployee({
      variables: {
        deleteEmployeeId: employeeid,
      },
    });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="delete-section-dailog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Delete Employee </Stack>
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
          <Box className="box-form">
            <Stack direction="row" spacing={1} width="100%">
              <Typography variant="subtitle1">
                Do you want to delete this Employee?
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              width="100%"
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle1">Please type</Typography>
              <Typography className="body-void" variant="subtitle1">
                employee
              </Typography>
              <Typography variant="subtitle1">to delete</Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              width="100%"
              sx={{ mb: 3 }}
            >
              <TextField
                size="small"
                fullWidth
                onChange={(e) => setValueVoid(e.target.value)}
              />
            </Stack>
          </Box>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Box className="action-button">
          <Grid item container spacing={4}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={5}>
                {valueVoid === "EMPLOYEE" ? (
                  loading ? (
                    <Button
                      sx={{
                        ":hover": { backgroundColor: "red", border: "none" },
                      }}
                      className="btn-void"
                      variant="outlined"
                      fullWidth
                    >
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        ":hover": { backgroundColor: "red", border: "none" },
                      }}
                      className="btn-void"
                      variant="outlined"
                      fullWidth
                      onClick={handleDelete}
                    >
                      delete now
                    </Button>
                  )
                ) : (
                  <Button variant="outlined" fullWidth>
                    delete
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
