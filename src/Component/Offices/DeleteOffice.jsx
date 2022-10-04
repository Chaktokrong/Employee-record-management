import React from "react";
import "./deleteposition.scss";
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

import CloseIcon from "@mui/icons-material/Close";

export default function DeletePosition({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="detete_position"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction="column" spacing={1}>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <Typography className="header-title" mt={1}>
              Delete Office
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
          Do you want to delete Office this ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="center" className="actions-btn">
          <Grid container>
            <Grid item xs={12}>
              <Button onClick={handleClose} fullWidth className="btn-delete">
                Delete
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
