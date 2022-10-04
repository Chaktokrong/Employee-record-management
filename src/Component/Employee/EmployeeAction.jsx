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
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeDelete from "./EmployeeDelete";
import DetailEmployee from "./DetailEmployee";

export default function EmployeeAction({
  editData,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEl = () => {
    setAnchorEl(null);
  };

  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
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
          employee="basic-button"
          anchorEl={anchorEl}
          open={openEl}
          onClose={handleCloseEl}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem onClick={() => { handleOpen(); handleCloseEl(); }}>
                        <Stack direction="row" spacing={2}>
                            <EditIcon sx={{ color: "blue" }} />
                            <Typography> Update </Typography>
                        </Stack>
                    </MenuItem> */}

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

      <EmployeeDelete
        open={openDelete}
        employeeid={editData?._id}
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
