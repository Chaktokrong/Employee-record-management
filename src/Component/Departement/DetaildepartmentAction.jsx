import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Stack, Typography, IconButton, Modal } from "@mui/material";

//componnent
import UpdateOffice from "./UpdateOffice";
import DeleteOffice from "./DeleteOffice";

export default function DetaildepartmentAction({
  item,
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

  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setUserId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizOutlinedIcon className="icons" sx={{ fontSize: "0.8em" }} />
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
              <Typography> Delete </Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </>

      <UpdateOffice
        setRefetch={setRefetch}
        open={open}
        rowData={item}
        handleClose={handleClose}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      <DeleteOffice
        open={openDelete}
        refetch={setRefetch}
        handleClose={handleCloseDelete}
        rowData={item}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
