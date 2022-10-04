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

//componnent
import UpdateSection from "./UpdateSection";
import DeleteSection from "./DeleteSection";

export default function SectionAction({
  officeId,
  editData,
  refectSection,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  setRefetchOffice,
}) {
  const navigate = useNavigate();

  // console.log(editData);

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

  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [idSection, setIdSection] = useState("");
  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setIdSection(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ fontSize: "1em", color: "#1976d2" }} />
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
              handleOpenDelete(editData?._id);
              handleCloseEl();
            }}
          >
            <Stack direction="row" spacing={2}>
              <DeleteIcon sx={{ color: "red" }} />
              <Typography> Delete</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </>

      <UpdateSection
        handleClose={handleClose}
        setRefetchOffice={setRefetchOffice}
        open={open}
        officeId={officeId}
        editData={editData}
        refectSection={refectSection}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

      <DeleteSection
        handleClose={handleCloseDelete}
        open={openDelete}
        idSection={idSection}
        refectSection={refectSection}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
        setRefetchOffice={setRefetchOffice}
      />
    </div>
  );
}
