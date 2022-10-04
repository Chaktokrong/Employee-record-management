
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack, Typography, IconButton, Modal } from '@mui/material';

//componnent 
import UpdateSalary from './UpdateSalary';
import Deletesalary from './Deletesalary';



export default function UserformAction({ setOpenSuccess, setOpenError, setSuccesstMessage, setErrorMessage, }) {

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

    const [userId, setUserId] = useState("");

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
                <MoreVertIcon
                    // className="icons" 
                    sx={{ fontSize: "1.2em", color: "#0f81c2" }}
                />
            </IconButton>
            <>
                <Menu
                    id="basic-button"
                    anchorEl={anchorEl}
                    open={openEl}
                    onClose={handleCloseEl}
                    MenuListProps={{ "aria-labelledby": "basic-button", }}
                >
                    <MenuItem onClick={() => { handleOpen(); handleCloseEl(); }}>
                        <Stack direction="row" spacing={2}>
                            <EditIcon sx={{ color: "blue" }} />
                            <Typography> Update </Typography>
                        </Stack>
                    </MenuItem>
                    {/* row?._id */}
                    <MenuItem onClick={() => { handleOpenDelete(); handleCloseEl(); }}>
                        <Stack direction="row" spacing={2}>
                            <DeleteIcon sx={{ color: "red" }} />
                            <Typography> Delete </Typography>
                        </Stack>
                    </MenuItem>
                </Menu>
            </>

            <Modal open={open}>
                <UpdateSalary
                    handleClose={handleClose}
                    open={open}
                    // row={row}
                    // setRefetch={setRefetch}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                    setSuccesstMessage={setSuccesstMessage}
                    setErrorMessage={setErrorMessage}
                />
            </Modal>

            <Modal open={openDelete}>
                <Deletesalary
                    handleCloseDelete={handleCloseDelete}
                    handleClose={handleClose}
                    handleOpenDelete={handleOpenDelete}
                    // userId={userId}
                    // setRefetch={setRefetch}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                    setSuccesstMessage={setSuccesstMessage}
                    setErrorMessage={setErrorMessage}
                />
            </Modal>
        </div>
    )
}
