import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Modal, Stack, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import UpdateEmployeeAttendace from "./UpdateEmployeeAttendance";

export default function AttendanceAction() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon
          sx={{ color: "#3C64F6", height: "1.3em", width: "1.3em" }}
        />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenUpdate();
          }}
        >
          <Stack direction="row" spacing={1}>
            <EditIcon sx={{ color: "green" }} />
            <Typography>Edit</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <UpdateEmployeeAttendace
        open={openUpdate}
        handleClose={handleCloseUpdate}
      />
    </div>
  );
}
