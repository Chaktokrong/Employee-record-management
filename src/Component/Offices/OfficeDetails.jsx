import React from "react";
import "./officedetails.scss";
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import EmployeeImg from "../../Assets/employee/employee1.svg";
//Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
//Components
import CreateOffice from "./CreateOffice";
import DeleteOffice from "./DeleteOffice";
import CreatePosition from "./CreatePosition";
import DeletePosition from "./DeletePosition";

export default function OfficeDetails() {
  const navigate = useNavigate();
  //handle open
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handle Edit
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  //handle Delete
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //handle Edit Office
  const [openEditOffice, setOpenEditOffice] = React.useState(false);
  const handleOpenEditOffice = () => setOpenEditOffice(true);
  const handleCloseEditOffice = () => setOpenEditOffice(false);

  //handle Delete Office
  const [openDeleteOffice, setOpenDeleteOffice] = React.useState(false);
  const handleOpenDeleteOffice = () => setOpenDeleteOffice(true);
  const handleCloseDeleteOffice = () => setOpenDeleteOffice(false);

  const data = [0, 1, 2, 3, 4];
  return (
    <div className="detial-office">
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">
            <b
              onClick={() => navigate("/office")}
              style={{ cursor: "pointer" }}
            >
              Offices{" "}
            </b>
            / Details
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="column"
          justifyContent="center"
          className="btn-create"
        >
          <Button
            className="style-add"
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon />}
          >
            Create
          </Button>
        </Stack>
      </Stack>

      <Grid item container spacing={2} mt={5}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={2.4}>
          <Box className="profile-container">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6} md={12}>
                <Stack
                  className="profile"
                  direction="row"
                  justifycontent="center"
                >
                  <Avatar src={`${EmployeeImg}`} className="avater-image" />
                </Stack>
                <Typography className="name-container">
                  {/* {viewData?.latin_name?.first_name +
                " " +
                viewData?.latin_name?.last_name} */}
                  Theang Rothana
                </Typography>
                <Typography className="position-container">
                  {/* {viewData?.position ? viewData?.position : "---:---"} */}
                  Head of Finance Office
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <Box className="box-contact">
                  <Grid item container spacing={1}>
                    <Grid item xs={2}>
                      <Typography>
                        <EmailIcon className="contact-icon" />
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography className="contact-des">
                        theangrothana@gmail.com
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        <PhoneInTalkOutlinedIcon className="contact-icon" />
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography className="contact-des">
                        +855 96 254 625 / +855 23 562 652
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        <LocationOnOutlinedIcon className="contact-icon-location" />
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography className="contact-des">
                        National #Road6 , Siemreap, Cambodia
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              marginTop={2}
            >
              <Box className="box_outside">
                <IconButton size="small" onClick={handleOpenEditOffice}>
                  <FiEdit className="edit-icon" />
                </IconButton>
              </Box>

              <Box className="box_outside">
                <IconButton size="small" onClick={handleOpenDeleteOffice}>
                  <DeleteForeverIcon className="delete-icon" />
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} xl={9.6}>
          <Box className="card-details">
            <TableContainer>
              <Table className="table-head">
                <TableHead>
                  <TableRow className="table-row">
                    <TableCell className="cell-card" width="10%">
                      No
                    </TableCell>
                    <TableCell className="cell-card" width="25%">
                      Position
                    </TableCell>
                    <TableCell className="cell-card" width="25%">
                      IN Office
                    </TableCell>
                    <TableCell className="cell-card" width="25%">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>

              {data?.map((index) => (
                <Table className="under-table" key={index}>
                  <TableBody>
                    <TableRow className="body">
                      <TableCell className="table-cell" width="8%">
                        {index + 1} -
                      </TableCell>
                      <TableCell className="table-cell" width="25%">
                        Cashier
                      </TableCell>
                      <TableCell className="table-cell">
                        Finance Office
                      </TableCell>
                      <TableCell className="table-cell" width="25%">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Box className="box_outside">
                            <IconButton size="small" onClick={handleOpenEdit}>
                              <FiEdit
                                style={{ color: "#0f81c2", fontSize: "21px" }}
                              />
                            </IconButton>
                          </Box>

                          <Box className="box_outside">
                            <IconButton size="small" onClick={handleOpenDelete}>
                              <DeleteForeverIcon sx={{ color: "red" }} />
                            </IconButton>
                          </Box>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
            </TableContainer>

            <Stack direction="row" justifyContent="right" mt={3}>
              <Pagination count={10} variant="outlined" color="primary" />
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <CreateOffice
        open={openEditOffice}
        handleClose={handleCloseEditOffice}
        title={"Create"}
      />
      <DeleteOffice
        open={openDeleteOffice}
        handleClose={handleCloseDeleteOffice}
      />
      <CreatePosition open={open} handleClose={handleClose} title={"Create"} />
      <CreatePosition
        open={openEdit}
        handleClose={handleCloseEdit}
        title={"Update"}
      />
      <DeletePosition open={openDelete} handleClose={handleCloseDelete} />
    </div>
  );
}
