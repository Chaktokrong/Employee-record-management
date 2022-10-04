import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  Stack,
  Typography,
  IconButton,
  Modal,
  Box,
  Button,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./departementaction.scss";

//componnent
import UpdateDepartment from "./UpdateDepartment";
import DeleteDepertment from "./DeleteDepertment";

export default function DepartementAction({
  row,
  setRefetch,
  btnTitle,
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
      {/* the style is wrote in departement.scss */}
      <Stack direction="row" className="container-icons-depart">
        <Button onClick={handleOpen}>
          <Box className="box-icon-add">
            <BorderColorIcon className="Edit-icon" />
          </Box>
        </Button>
        <Button onClick={() => handleOpenDelete(row?._id)}>
          <Box className="box-icon-del">
            <DeleteForeverIcon className="Del-icon" />
          </Box>
        </Button>
      </Stack>

      <UpdateDepartment
        DataRow={row}
        open={open}
        setRefetch={setRefetch}
        handleClose={handleClose}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      <DeleteDepertment
        open={openDelete}
        userId={userId}
        handleClose={handleCloseDelete}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
