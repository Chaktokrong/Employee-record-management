import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import {
  Box,
  Button,
  Divider,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import "./deleteuser.scss";
import { useMutation } from "@apollo/client";
// Schema
import { DELETE_USER } from "../../Schema/User";

export default function DeleteUser({
  open,
  handleCloseDelete,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  userId,
}) {
  const [loading, setLoading] = React.useState(false);
  const [valueVoid, setValueVoid] = React.useState("");

  // Delete
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      if (deleteUser?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteUser?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(deleteUser?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleDelete = () => {
    deleteUser({
      variables: {
        deleteUserId: userId,
      },
    });
  };

  return (
    <Dialog
      className="delete-user"
      aria-labelledby="responsive-dialog-title"
      open={open}
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="header-title"> Delete User </Stack>
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
                Do you want to Delete this User?
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} width="100%" sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Please type</Typography>
              <Typography className="body-void" variant="subtitle1">
                User
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
            <Grid item container spacing={4}>
              <Grid item xs={12}>
                {valueVoid === "USER" ? (
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
