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
  TableCell,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
//components
import "./employeeinfo.scss";
import LoadingPage from "../Include/LoadingPage";
import EmptyData from "../Include/EmptyData";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE_BYID } from "../../Schema/Employee";

export default function EmployeeInformation({ viewData }) {
  // console.log("viewData>>>>", viewData);

  return (
    <div className="employee-information">
      <Box sx={{ flexGrow: 1 }} className="main-containner">
        <Grid item container spacing={3}>
          <Grid item xs={12} md={5} lg={4} xl={3}>
            <Box className="profile-container">
              <Stack
                className="profile"
                direction="row"
                justifycontent="center"
              >
                <Avatar src={viewData?.image?.src} className="avater-image" />
              </Stack>
              <Typography
                className="profile-name-khmer"
                sx={{ marginTop: "20px" }}
              >
                {viewData?.khmer_name?.first_name +
                  " " +
                  viewData?.khmer_name?.last_name}
              </Typography>
              <Typography className="profile-name">
                {viewData?.latin_name?.first_name +
                  " " +
                  viewData?.latin_name?.last_name}
              </Typography>
              <Divider sx={{ marginTop: "10px" }} />
              <Typography className="title-items">gender</Typography>
              <Typography className="items-name">{viewData?.gender}</Typography>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <Typography className="title-items">nationality</Typography>
                  <Typography className="items-name">
                    {viewData?.nationality}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="title-items">
                    marital status
                  </Typography>
                  <Typography className="items-name">
                    {viewData?.marital}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className="title-items">nationality ID</Typography>
              <Typography className="items-name">
                {viewData?.nationality_id
                  ? viewData?.nationality_id
                  : "---:---"}
              </Typography>
              <Typography className="title-items">email</Typography>
              <Typography className="items-name">{viewData?.email}</Typography>
              <Typography className="title-items">phone number</Typography>
              <Typography className="items-name">{viewData?.phone}</Typography>
              <Typography className="title-items">place of birth</Typography>
              <Typography className="items-name">
                {viewData?.place_of_birth}
              </Typography>
              <Typography className="title-items">current address</Typography>
              <Typography className="items-name">
                {viewData?.current_address}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={7} lg={8} xl={4.5}>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Box className="table-container">
                  <Typography className="title-table">Education</Typography>
                  <Table className="education-table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell className="table-cell" width="10%">
                          N°
                        </TableCell>
                        <TableCell className="table-cell" width="40%">
                          University name
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Major
                        </TableCell>
                        <TableCell className="table-cell" width="20%">
                          Year
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {viewData?.edu_background?.length !== 0 ? (
                      <>
                        {viewData?.edu_background?.map((data, index) => (
                          <TableBody key={index}>
                            <TableRow className="table-row-body">
                              <TableCell className="table-cell" width="10%">
                                {index + 1}
                              </TableCell>
                              <TableCell className="table-cell" width="40%">
                                {data?.school}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                {data?.title}
                              </TableCell>
                              <TableCell className="table-cell" width="20%">
                                {data?.start_end_date}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </>
                    ) : (
                      <TableBody>
                        <TableRow className="table-row">
                          <TableCell
                            className="table-cell"
                            colSpan={4}
                            sx={{ textAlign: "center" }}
                          >
                            <EmptyData />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="table-container">
                  <Typography className="title-table">Insurance</Typography>
                  <Table className="education-table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell className="table-cell" width="10%">
                          N°
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          University name
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Major
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Year
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {viewData?.insurance?.length !== 0 ? (
                      <>
                        {viewData?.insurance?.map((data, index) => (
                          <TableBody key={index}>
                            <TableRow className="table-row-body">
                              <TableCell className="table-cell" width="10%">
                                {index + 1}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                University name
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                Major
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                Year
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </>
                    ) : (
                      <TableBody>
                        <TableRow className="table-row">
                          <TableCell
                            className="table-cell"
                            colSpan={4}
                            sx={{ textAlign: "center" }}
                          >
                            <EmptyData />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={7} lg={8} xl={4.5}>
            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <Box className="table-container">
                  <Typography className="title-table">Experience</Typography>
                  <Table className="education-table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell className="table-cell" width="10%">
                          N°
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          University name
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Major
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Year
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {viewData?.experience?.length !== 0 ? (
                      <>
                        {viewData?.experience?.map((data, index) => (
                          <TableBody key={index}>
                            <TableRow className="table-row-body">
                              <TableCell className="table-cell" width="10%">
                                {index + 1}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                {data?.company}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                {data?.title}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                {data?.start_end_date}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </>
                    ) : (
                      <TableBody>
                        <TableRow className="table-row">
                          <TableCell
                            className="table-cell"
                            colSpan={4}
                            sx={{ textAlign: "center" }}
                          >
                            <EmptyData />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="table-container">
                  <Typography className="title-table">Work permit</Typography>
                  <Table className="education-table">
                    <TableHead>
                      <TableRow className="table-row">
                        <TableCell className="table-cell" width="10%">
                          N°
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          University name
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Major
                        </TableCell>
                        <TableCell className="table-cell" width="30%">
                          Year
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {viewData?.work_permit?.length !== 0 ? (
                      <>
                        {viewData?.work_permit?.map((data, index) => (
                          <TableBody key={index}>
                            <TableRow className="table-row-body">
                              <TableCell className="table-cell" width="10%">
                                {index + 1}
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                University name
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                Major
                              </TableCell>
                              <TableCell className="table-cell" width="30%">
                                Year
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </>
                    ) : (
                      <TableBody>
                        <TableRow className="table-row">
                          <TableCell
                            className="table-cell"
                            colSpan={4}
                            sx={{ textAlign: "center" }}
                          >
                            <EmptyData />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
