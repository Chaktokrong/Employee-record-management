import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import UpdateContract from "./UpdateContract";

export default function ContractAction({
  editData,
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

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon className="icons" />
      </IconButton>

      <Menu
        id="basic-button"
        anchorEl={anchorEl}
        open={openEl}
        onClose={handleCloseEl}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem
          onClick={() => {
            handleCloseEl();
            handleOpenUpdate();
          }}
        >
          <Stack direction="row" spacing={2}>
            <BorderColorIcon sx={{ color: "#0f81c2" }} />
            <Typography> Update </Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={() => handleCloseEl()}>
          <Stack direction="row" spacing={2}>
            <DeleteForeverIcon sx={{ color: "red" }} />
            <Typography> Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <UpdateContract
        handleClose={handleCloseUpdate}
        open={openUpdate}
        editData={editData}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* <DeleteUser
        handleClose={handleCloseDelete}
        open={openDelete}
        userId={userId}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      /> */}
    </>
  );
}
