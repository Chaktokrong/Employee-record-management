import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Typography, IconButton, Modal } from "@mui/material";
//componnent
import Updateuser from "./Updateuser";
import DeleteUser from "./DeleteUser";

export default function UserformAction({
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

  const navigate = useNavigate();

  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [userId, setUserId] = useState("");

  // const handleOpenEdit = (row) => {
  //     setOpenEdit(true);
  // };
  // const handleCloseEdit = () => {
  //     setOpenEdit(false);
  // };

  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setUserId(e);
    // console.log(e, "eeeee")
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon className="icons" />
      </IconButton>

      <>
        <Menu
          id="basic-button"
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
              <BorderColorIcon sx={{ color: "#0f81c2" }} />
              <Typography> Update </Typography>
            </Stack>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleOpenDelete(row?._id);
              handleCloseEl();
            }}
          >
            <Stack direction="row" spacing={2}>
              <DeleteForeverIcon sx={{ color: "red" }} />
              <Typography> Delete</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </>

      <Updateuser
        handleClose={handleClose}
        open={open}
        row={row}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      <DeleteUser
        handleClose={handleCloseDelete}
        open={openDelete}
        userId={userId}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
