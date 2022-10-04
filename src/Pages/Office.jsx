import React from "react";
import "./office.scss";
import {
  Grid,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Button,
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
//icons
import EmployeeImg from "../Assets/employee/employee1.svg";
import Dropicon from "../Assets/Icon ionic-ios-arrow-dropright.svg";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateOffice from "../Component/Offices/CreateOffice";

export default function Office() {
  const data = [1, 2, 3, 4];
  //handal open
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="office-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center" className="color">
          Offices
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="column" className="stack-btn" spacing={5}>
          <Button
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon />}
            className="style-add"
          >
            Create
          </Button>
        </Stack>
      </Stack>

      <Box className="container">
        <Grid item container spacing={2}>
          <Grid item xs={12} md={8} lg={9}>
            {data?.map((index) => (
              <Box mt={2}>
                <TableBody className="table-body" key={index}>
                  <TableRow className="table-row">
                    <TableCell className="table-first-cell">
                      <Typography className="text-of-hand">
                        Office Finance
                      </Typography>
                    </TableCell>

                    <TableCell className="table-cell" width="40%">
                      <Stack direction="row" justifyContent="left" spacing={2}>
                        <Stack direction="column">
                          <ArrowRightIcon className="arrow-icon" />
                        </Stack>
                        <Stack direction="column">
                          <Avatar
                            src={`${EmployeeImg}`}
                            className="image-employee"
                          />
                        </Stack>
                        <Stack direction="column">
                          <Typography className="title">
                            Theang Rothana
                          </Typography>
                          <Typography className="sub-title">
                            Hand Of Office
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell className="table-cell">
                      <Stack direction="column">
                        <Typography className="sub-title-center">
                          Phone:
                        </Typography>
                        <Typography className="sub-title-center">
                          Email:
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell className="table-cell">
                      <Stack direction="column">
                        <Typography className="sub-title-I">
                          +855 26 856 25
                        </Typography>
                        <Typography className="sub-title-I">
                          theangrathana@gmail.com
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell className="table-seconde-cell" width="4%">
                      <Link
                        to="/office/detailoffice"
                        style={{ textDecoration: "none" }}
                      >
                        <img src={`${Dropicon}`} width="25px" height="25px" />
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Box>
            ))}

            <Stack direction="row" justifyContent="right" mt={3}>
              <Pagination count={5} variant="outlined" color="primary" />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Stack
              direction="column"
              spacing={1}
              className="card-details"
              mt={2}
            >
              <Stack
                direction="column"
                justifyContent="center"
                className="header-card"
              >
                Offcie & Employee
              </Stack>

              <TableContainer sx={{ mt: 2 }}>
                <Table className="table-head" mt={2}>
                  <TableHead>
                    <TableRow className="table-row">
                      <TableCell className="cell-card" width="20%">
                        Color
                      </TableCell>
                      <TableCell className="cell-card" width="50%">
                        Office
                      </TableCell>
                      <TableCell className="cell-card" width="30%">
                        Employee
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>

                {data?.map((item, index) => (
                  <Table className="under-table" key={index}>
                    <TableBody>
                      <TableRow className="body">
                        <TableCell
                          className="table-cell"
                          align="center"
                          width="20%"
                        >
                          <CircleIcon className="circle-icon" />
                        </TableCell>
                        <TableCell className="table-cell" width="50%">
                          Finance Office
                        </TableCell>
                        <TableCell className="table-cell">25</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ))}
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <CreateOffice open={open} handleClose={handleClose} title={"Create"} />
    </div>
  );
}
