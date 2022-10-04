import React from "react";
import "./deleteshift.scss";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
import { DELETE_SHIFT } from "../../Schema/Shift";

export default function DeleteShift({
  shiftId,
  open,
  handleClose,
  setState,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [deleteShift] = useMutation(DELETE_SHIFT, {
    onCompleted: ({ deleteShift }) => {
      //   console.log("deleteShift>>>", deleteShift);
      if (deleteShift?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteShift?.message);
        setRefetch();
        handleClose();
        setState({ right: false });
      } else {
        setOpenError(true);
        setErrorMessage(deleteShift?.message);
      }
    },
    oneError: ({ error }) => {
      console.log(error.massage);
    },
  });

  const handleDelete = () => {
    deleteShift({
      variables: {
        deleteShiftId: shiftId,
      },
    });
  };

  return (
    <Dialog
      open={open}
      className="detete_position"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction="column" spacing={1}>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography className="header-title" mt={1}>
              Delete Shift
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton>
              <CloseIcon onClick={handleClose} className="close-icon" />
            </IconButton>
          </Stack>
          <Divider sx={{ mt: 1 }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this Shift?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="center" className="actions-btn">
          <Grid item container>
            <Grid item xs={12}>
              <Button onClick={handleDelete} fullWidth className="btn-delete">
                Delete
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
