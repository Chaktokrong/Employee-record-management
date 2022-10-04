import * as React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import "./dailyattendancereport.scss";
import DoneIcon from "@mui/icons-material/Done";
import LogoReport from "../../Assets/logoLogin.svg";

export default function DailyAttendanceReport() {
  const dataReport = [12, 3, 4, 5, 3, 6, 7, 1, 2, 2, 3, 4];
  return (
    <Box className="report-styles">
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} className="grid-report">
          <Grid item xs={4} className="grid-center">
            <Box className="logo">
              <img src={LogoReport} className="logo-size" />
            </Box>
          </Grid>
          <Grid item xs={4} className="grid-center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography className="title-Report">GO GLOBAL SCHOOL</Typography>
              <Typography className="title-Report">
                Daily Attendance Report
              </Typography>
              <Typography className="title-Report">On Aug 01, 2022</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction="row" justifyContent="right" width="100%">
              <Box className="box-small">
                <Stack>Present :</Stack>
                <Typography className="present-num">15</Typography>
              </Box>
              <Box className="box-small">
                <Stack>Permission :</Stack>
                <Typography className="present-num">2</Typography>
              </Box>
              <Box className="box-small">
                <Stack>Late :</Stack>
                <Typography className="present-num">4</Typography>
              </Box>
              <Box className="box-small">
                <Stack>Absent :</Stack>
                <Typography className="present-num">2</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <table className="table">
          <tr>
            <th className="header-title" align="left" style={{ width: "60px" }}>
              N°
            </th>
            <th className="header-title" align="left">
              Name
            </th>
            <th className="header-title" align="left" style={{ width: "10%" }}>
              Department
            </th>
            <th className="header-title" align="left" style={{ width: "10%" }}>
              Position
            </th>
            <th
              className="header-title"
              align="center"
              style={{ width: "10%" }}
            >
              Present
            </th>
            <th
              className="header-title"
              align="center"
              style={{ width: "10%" }}
            >
              Permission
            </th>
            <th
              className="header-title"
              align="center"
              style={{ width: "10%" }}
            >
              Late
            </th>
            <th
              className="header-title"
              align="center"
              style={{ width: "10%" }}
            >
              Absent
            </th>
            <th className="header-title" align="center">
              Reason
            </th>
          </tr>
          {dataReport?.map((row, index) => (
            <tr key={index}>
              <td className="body-text">#0001</td>
              <td className="body-text">Maria Anders</td>
              <td className="body-text">Germany</td>
              <td className="body-text">Alfreds Futterkiste</td>
              <td className="body-text" align="center">
                <DoneIcon className="icon-tick" />
              </td>
              <td className="body-text" align="center">
                <DoneIcon className="icon-tick" />
              </td>
              <td className="body-text" align="center">
                10min
              </td>
              <td className="body-text" align="center">
                <DoneIcon className="icon-tick" />
              </td>
              <td className="body-text" align="center">
                Germany Germany
              </td>
            </tr>
          ))}
        </table>
      </Box>
    </Box>
  );
}
