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
  Grid,
  Divider,
  Typography,
} from "@mui/material";
// Icons
import CloseIcon from "@mui/icons-material/Close";

import "./deletedepertment.scss";
import { useMutation } from "@apollo/client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

// Schema
import { DELETE_DEPARTMENT } from "../../Schema/Departement";

export default function DeleteDepertment({
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  userId,
  open,
}) {
  const [loading, setLoading] = useState(false);
  const [valueVoid, setValueVoid] = React.useState("");
  // Delete
  const [deleteAffair] = useMutation(DELETE_DEPARTMENT, {
    onCompleted: ({ deleteAffair }) => {
      // console.log("deleteAffair::", deleteAffair)
      if (deleteAffair?.status === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteAffair?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setOpenError(true);
        setErrorMessage(deleteAffair?.message);
        setLoading(false);
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
    //
    deleteAffair({
      variables: {
        deleteAffairId: userId,
      },
    });
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="delete-department-dailog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Delete Department </Stack>
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
                Do you want to delete this department?
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
                department
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
                {valueVoid === "DEPARTMENT" ? (
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
