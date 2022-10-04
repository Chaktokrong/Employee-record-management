import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  Table,
  Typography,
  TableHead,
  Avatar,
  TableCell,
  TableBody,
  TableRow,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import "./employeeattendance.scss";
//icons
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import moment from "moment";

export default function EmployeeAttendance({ viewData }) {
  let testArr = [1, 2, 3, 4];

  return (
    <div className="employee-attendance">
      <Box sx={{ flexGrow: 1 }} className="main-containner">
        <Grid item container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Box className="profile-container">
              <Stack
                className="profile"
                direction="row"
                justifycontent="center"
              >
                <Avatar src={viewData?.image?.src} className="avater-image" />
              </Stack>
              <Typography className="name-container-khmer">
                {viewData?.khmer_name?.first_name +
                  " " +
                  viewData?.khmer_name?.last_name}
              </Typography>
              <Typography className="name-container">
                {viewData?.latin_name?.first_name +
                  " " +
                  viewData?.latin_name?.last_name}
              </Typography>
              <Typography className="position-container">
                {viewData?.position ? viewData?.position : "---:---"}
              </Typography>
              <Box className="box-contact">
                <Grid item container spacing={1}>
                  <Grid item xs={2}>
                    <Typography>
                      <EmailIcon className="contact-icon" />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="contact-des">
                      {viewData?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      <PhoneInTalkOutlinedIcon className="contact-icon" />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="contact-des">
                      {viewData?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      <LocationOnOutlinedIcon className="contact-icon-location" />
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className="contact-des">
                      {viewData?.place_of_birth}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Box className="leave-container">
              <Grid item container spacing={0}>
                <Grid item xs={3} className="grid-leave">
                  <Box className="box-leave">
                    <Typography className="leave-num">20</Typography>
                    <Typography className="leave-public">
                      Public holiday
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} className="grid-leave">
                  <Box className="box-leave">
                    <Typography className="leave-num">20</Typography>
                    <Typography className="leave-annual">
                      Annual Leave
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} className="grid-leave">
                  <Box className="box-leave">
                    <Typography className="leave-num">20</Typography>
                    <Typography className="leave-unpaid">
                      Absent/Leave
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} className="grid-leave">
                  <Box className="last-box-leave">
                    <Typography className="leave-num">20</Typography>
                    <Typography className="leave-permission">
                      Permission
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box className="table-attendance">
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      className="tablecell-container"
                      sx={{
                        borderRadius: "10px 0px 0px 10px",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell align="center" className="tablecell-container">
                      Check In
                    </TableCell>
                    <TableCell align="center" className="tablecell-container">
                      Check Out
                    </TableCell>
                    <TableCell
                      align="center"
                      className="tablecell-container"
                      sx={{
                        borderRadius: "0px 10px 10px 0px",
                      }}
                    >
                      Working Hr's
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testArr.map((d, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left" className="tablecell-body">
                          {moment(new Date()).format("ddd, DD MMM YYYY")}
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          7:00
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          9:00
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          17:00 hr
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={4}
                      className="tablecell-body"
                    >
                      Weekend
                    </TableCell>
                  </TableRow>
                  {testArr.map((d, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left" className="tablecell-body">
                          {moment(new Date()).format("ddd, DD MMM YYYY")}
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          7:00
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          9:00
                        </TableCell>
                        <TableCell align="center" className="tablecell-body">
                          17:00 hr
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Box className="box-seemore">
                <Button className="btn-seemore">See more</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
