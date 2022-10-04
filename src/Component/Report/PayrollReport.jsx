import * as React from "react";
import { Box, Grid, Typography, Stack } from "@mui/material";
import "./dailyattendancereport.scss";
import DoneIcon from "@mui/icons-material/Done";
import LogoReport from "../../Assets/logoLogin.svg";

export default function PayrollReport() {
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
              <Typography className="title-Report">Payroll Report</Typography>
              <Typography className="title-Report">
                From Aug 01, 2022 to Aug 31, 2022
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction="row" justifyContent="right" width="100%">
              <Box className="box-top">
                <Stack>Total Salary Payment:</Stack>
                <Typography className="present-num"> 7,842.25 $ </Typography>
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
            <th className="header-title" align="right" style={{ width: "10%" }}>
              Base Salary
            </th>
            <th className="header-title" align="right" style={{ width: "10%" }}>
              Bonus
            </th>
            <th className="header-title" align="right" style={{ width: "10%" }}>
              OT
            </th>
            <th className="header-title" align="right" style={{ width: "10%" }}>
              TAX
            </th>
            <th className="header-title" align="right">
              Absent/Find
            </th>
            <th className="header-title" align="right">
              Salary Payment
            </th>
          </tr>
          {dataReport?.map((row, index) => (
            <tr key={index}>
              <td className="body-text">#0001</td>
              <td className="body-text">Maria Anders</td>
              <td className="body-text">Germany</td>
              <td className="body-text">Alfreds Futterkiste</td>
              <td className="body-text" align="right">
                $ 120
              </td>
              <td className="body-text" align="right">
                $ 12
              </td>
              <td className="body-text" align="right">
                $ 10
              </td>
              <td className="body-text" align="right">
                $ 12
              </td>
              <td className="body-text" align="right">
                $ 12
              </td>
              <td className="body-text" align="right">
                $ 120.00
              </td>
            </tr>
          ))}
        </table>
      </Box>
    </Box>
  );
}
