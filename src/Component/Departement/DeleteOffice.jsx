import React, { useState } from "react";
//material
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./deleteoffice.scss";
import {
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Divider,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DateRangeIcon from "@mui/icons-material/DateRange";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

//component
import Departmantimage from "../../Assets/logo.svg";
//Schema
import { DELETE_OFFICE } from "../../Schema/office";
//apollo client
import { useMutation } from "@apollo/client/react";

export default function UpdateOffice({
  handleClose,
  btnTitle,
  rowData,
  refetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  open,
}) {
  // console.log(rowData, "rowData");
  const [loading, setLoading] = useState(false);
  const [valueVoid, setValueVoid] = useState("");

  //create office
  const [deleteOffice] = useMutation(DELETE_OFFICE, {
    onCompleted: ({ deleteOffice }) => {
      console.log(deleteOffice?.message, "Create success");

      if (deleteOffice?.status === true) {
        // console.log(deleteOffice?.message, "Create success");
        setOpenSuccess(true);
        setSuccesstMessage(deleteOffice?.message);
        refetch();
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(deleteOffice?.message);
      }
    },
    onError: ({ error }) => {
      console.log(error.message);
    },
  });

  const handleDelete = () => {
    deleteOffice({
      variables: {
        deleteOfficeId: rowData?._id,
      },
    });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="delete-office-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Delete Office </Stack>
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
                Do you want to delete this Office?
              </Typography>
            </Stack>

            <Stack
              direction="row"
              // justifyContent="center"
              spacing={1}
              width="100%"
              sx={{ mt: 2 }}
            >
              <Typography variant="subtitle1">Please type</Typography>
              <Typography className="body-void" variant="subtitle1">
                Office
              </Typography>
              <Typography variant="subtitle1">to delete</Typography>
            </Stack>

            <Stack direction="row" spacing={1} width="100%" sx={{ mb: 3 }}>
              <TextField
                size="small"
                fullWidth
                onChange={(e) => setValueVoid(e.target.value)}
              />
            </Stack>
            <Grid item container spacing={4}>
              <Grid item xs={12}>
                {valueVoid === "OFFICE" ? (
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
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
