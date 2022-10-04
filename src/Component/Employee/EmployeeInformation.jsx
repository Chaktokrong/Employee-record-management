import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  Avatar,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  TableCell,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
//components
import "./employeeinformation.scss";
import LoadingPage from "../Include/LoadingPage";
import EmptyData from "../Include/EmptyData";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_BYID } from "../../Schema/Employee";
import FilePresentIcon from "@mui/icons-material/FilePresent";

export default function EmployeeInformation({ viewData }) {
  // console.log("viewData>>>>", viewData);

  return (
    <div className="employee-information-class">
      <Box sx={{ flexGrow: 1 }} className="main-containner">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box className="profile-container">
              <Stack
                className="profile"
                direction="row"
                justifycontent="center"
              >
                <Avatar src={viewData?.image?.src} className="avater-image" />
              </Stack>
              <Divider sx={{ mt: 2 }} />
              <Typography className="header-info-text-top">
                Personal Data
              </Typography>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text-khmer">
                  គោត្ត​នាម នាម
                </Typography>
                <Typography className="header-info-text">
                  First Name Last Name
                </Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text-khmer">
                  {viewData?.khmer_name?.first_name +
                    " " +
                    viewData?.khmer_name?.last_name}
                </Typography>
                <Typography className="body-info-text">
                  {viewData?.latin_name?.first_name +
                    " " +
                    viewData?.latin_name?.last_name}
                </Typography>
              </Stack>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">Gender</Typography>
                <Typography className="header-info-text">
                  Date of birth
                </Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text">
                  {viewData?.gender}
                </Typography>
                <Typography className="body-info-text">
                  {moment(viewData?.date_of_birth).format("DD/MM/YYYY")}
                </Typography>
              </Stack>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">
                  National ID
                </Typography>
                <Typography className="header-info-text">
                  Nationality
                </Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text">
                  {viewData?.national_id}
                </Typography>
                <Typography className="body-info-text">
                  {viewData?.nationality}
                </Typography>
              </Stack>

              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">Marital</Typography>
                <Typography className="header-info-text"></Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text">
                  {viewData?.marital}
                </Typography>
                <Typography className="body-info-text">
                  {/* {viewData?.email} */}
                </Typography>
              </Stack>

              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text-address">
                  Place of Birth
                </Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text-address">
                  {viewData?.place_of_birth}
                </Typography>
              </Stack>
              {/*   Contact =========================================================================================== */}
              <Typography className="header-info-text-top">
                Contact Details
              </Typography>

              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">Phone</Typography>
                <Typography className="header-info-text">Email</Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text">
                  {viewData?.phone}
                </Typography>
                <Typography className="body-info-text">
                  {viewData?.email}
                </Typography>
              </Stack>

              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text-address">
                  Current address
                </Typography>
              </Stack>
              <Stack className="body-info" direction="row" spacing={2}>
                <Typography className="body-info-text-address">
                  {viewData?.current_address}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          {/*  */}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box className="profile-container">
              {/* Education =========================================================================================== */}
              <Typography className="header-info-text-top">
                Education
              </Typography>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text-edu">
                  Scholatic Degree
                </Typography>
                <Typography className="header-info-text-edu">Place</Typography>
                <Typography className="header-info-text-edu" align="right">
                  Date
                </Typography>
              </Stack>
              {viewData?.edu_background?.map((data, index) => (
                <>
                  <Stack className="body-info" direction="row" spacing={2}>
                    <Typography className="body-info-text-edu">
                      {data?.title}
                    </Typography>
                    <Typography className="body-info-text-edu">
                      {data?.school}
                    </Typography>
                    <Typography className="body-info-text-edu" align="right">
                      {data?.start_end_date}
                    </Typography>
                  </Stack>
                </>
              ))}
              {/* Job Experience =========================================================================================== */}
              <Typography className="header-info-text-top">
                Job Experience
              </Typography>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text-edu">
                  Company
                </Typography>
                <Typography className="header-info-text-edu">
                  Position
                </Typography>
                <Typography className="header-info-text-edu" align="right">
                  Date
                </Typography>
              </Stack>
              {viewData?.experience?.map((data, index) => (
                <>
                  <Stack className="body-info" direction="row" spacing={2}>
                    <Typography className="body-info-text-edu">
                      {data?.title}
                    </Typography>
                    <Typography className="body-info-text-edu">
                      {data?.company}
                    </Typography>
                    <Typography className="body-info-text-edu" align="right">
                      {data?.start_end_date}
                    </Typography>
                  </Stack>
                </>
              ))}

              {/* Insurance =========================================================================================== */}
              <Typography className="header-info-text-top">
                Insurance
              </Typography>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">Company</Typography>
                <Typography className="header-info-text" align="right">
                  Date
                </Typography>
              </Stack>
              {viewData?.insurance?.map((data, index) => (
                <>
                  <Stack className="body-info" direction="row" spacing={2}>
                    <Typography className="body-info-text">
                      {data?.title}
                    </Typography>
                    <Typography className="body-info-text" align="right">
                      {data?.start_end_date}
                    </Typography>
                  </Stack>
                </>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box className="profile-container">
              {/* Work permit =========================================================================================== */}
              <Typography className="header-info-text-top">
                Work Permit
              </Typography>
              <Stack className="header-info" direction="row" spacing={2}>
                <Typography className="header-info-text">Full Name</Typography>
                <Typography className="header-info-text" align="right">
                  Expire Date
                </Typography>
              </Stack>
              {viewData?.work_permit?.map((data, index) => (
                <>
                  <Stack className="body-info" direction="row" spacing={2}>
                    <Typography className="body-info-text">
                      {data?.work_permit_name}
                    </Typography>
                    <Typography className="body-info-text" align="right">
                      {moment(data?.expire_date).format("DD/MMM/YYYY")}
                    </Typography>
                  </Stack>
                </>
              ))}

              {/* File,Certificate,Document =========================================================================================== */}
              <Typography className="header-info-text-top">
                Files, certificates and documents
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Button variant="text">
                    <FilePresentIcon sx={{ fontSize: "100px" }} />
                  </Button>
                  <Typography className="body-text-file">file name</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="text">
                    <FilePresentIcon sx={{ fontSize: "100px" }} />
                  </Button>
                  <Typography className="body-text-file">file name</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
