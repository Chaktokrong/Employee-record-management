import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { DELETE_TYPE_OF_TIME_OFF } from "../../Schema/Setting";
import { useMutation } from "@apollo/client";

import {
  Stack,
  Box,
  Grid,
  TextField,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import "./dialogbranchlocationdelete.scss";

export default function DialogTypeOfTimeOffDelete({
  row,
  open,
  handleClose,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [loading, setLoading] = React.useState(false);
  const [valueVoid, setValueVoid] = React.useState("");
  const [deleteTypeOfTimeOff] = useMutation(DELETE_TYPE_OF_TIME_OFF, {
    onCompleted: ({ deleteTypeOfTimeOff }) => {
      if (deleteTypeOfTimeOff?.status) {
        setSuccesstMessage(deleteTypeOfTimeOff?.message);
        setOpenSuccess(true);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setErrorMessage(deleteTypeOfTimeOff?.message);
        setOpenError(true);
      }
    },
    onError: (error) => {
      setErrorMessage(error?.message);
      setOpenError(true);
    },
  });

  const handleDelete = () => {
    deleteTypeOfTimeOff({
      variables: {
        deleteTypeOfTimeOffId: row?._id,
      },
    });
  };

  return (
    <Dialog
      className="delete-branch-dailog"
      aria-labelledby="responsive-dialog-title"
      open={open}
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title"> Delete Type Of Time Off </Stack>
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
                Do you want Delete this Type Of Time Off ?
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
                type of time off
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
                {valueVoid === "TYPE OF TIME OFF" ? (
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
