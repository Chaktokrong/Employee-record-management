import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Typography, IconButton, Modal } from "@mui/material";

// component
import DialogHoliday from "./DialogHoliday";
import DialogHolidayDelete from "./DialogHolidayDelete";

export default function PublicHolidayAction({
  row,
  setRefectch,
  monthSeleced,
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
        <MoreVertIcon className="icons" />
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
          <Stack direction="row" spacing={2}>
            <EditIcon sx={{ color: "blue" }} />
            <Typography> Update </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenDelete();
            handleCloseEl();
          }}
        >
          <Stack direction="row" spacing={2}>
            <DeleteIcon sx={{ color: "red" }} />
            <Typography> Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <DialogHoliday
        row={row}
        open={open}
        title="Update"
        monthSeleced={monthSeleced}
        setRefectch={setRefectch}
        handleClose={handleClose}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      <DialogHolidayDelete
        row={row}
        open={openDelete}
        setRefectch={setRefectch}
        handleClose={handleCloseDelete}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
