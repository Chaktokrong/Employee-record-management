import React, { useState } from "react";
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
  Typography,
  Grid,
  Divider,
} from "@mui/material";
// Icons
import CloseIcon from "@mui/icons-material/Close";
import "./deleteposition.scss";
import { useMutation } from "@apollo/client";
// Schema
import { DELETE_USER } from "../../Schema/User";
import { DELETE_JOB_TITLE } from "../../Schema/JobTitle";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

export default function CreatePosition({
  open,
  editData,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  title,
}) {
  const [loading, setLoading] = useState(false);
  const [valueVoid, setValueVoid] = React.useState("");
  // Delete
  const [deleteJobTitle] = useMutation(DELETE_JOB_TITLE, {
    onCompleted: ({ deleteJobTitle }) => {
      if (deleteJobTitle?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteJobTitle?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setLoading(false);
        setOpenError(true);
        setErrorMessage(deleteJobTitle?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteJobTitle({
      variables: {
        deleteJobTitleId: editData?._id,
      },
    });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="delete-position-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Delete Position </Stack>
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
                Do you want to delete this supplies?
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
                position
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
                {valueVoid === "POSITION" ? (
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
