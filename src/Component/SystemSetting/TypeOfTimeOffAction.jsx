import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Stack, Typography, IconButton, Modal } from "@mui/material";

// component
import DialogTypeOfTimeOff from "./DialogTypeOfTimeOff";
import DialogTypeOfTimeOffDelete from "./DialogTypeOfTimeOffDelete";

export default function TypeOfTimeOffAction({
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEl = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "#0f81c2" }} className="icons" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={openEl}
        onClose={handleCloseEl}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem
          onClick={() => {
            handleOpen();
            handleCloseEl();
          }}
        >
          <Stack direction="row" spacing={1}>
            <EditIcon sx={{ color: "blue", fontSize: 20 }} />
            <Typography> Update </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenDelete();
            handleCloseEl();
          }}
        >
          <Stack direction="row" spacing={1}>
            <DeleteIcon sx={{ color: "red", fontSize: 20 }} />
            <Typography> Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <DialogTypeOfTimeOff
        row={row}
        open={open}
        title="Update"
        setRefetch={setRefetch}
        handleClose={handleClose}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setErrorMessage={setErrorMessage}
        setSuccesstMessage={setSuccesstMessage}
      />
      <DialogTypeOfTimeOffDelete
        row={row}
        open={openDelete}
        setRefetch={setRefetch}
        handleClose={handleCloseDelete}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setErrorMessage={setErrorMessage}
        setSuccesstMessage={setSuccesstMessage}
      />
    </div>
  );
}
