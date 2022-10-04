import * as React from "react";
import { Grid, Box, Stack, Typography } from "@mui/material";
import "./employeeOverview.scss";
import { useQuery } from "@apollo/client";
import {
  GET_EMPLOYEE_OVERVIEW,
  GET_EMPLOYEE_FOREIGNER,
} from "../../Schema/Dashbord";
export default function EmployeeOverview() {
  //
  const [dataForeigner, setDataForeigner] = React.useState(null);
  const { refetch: refetchForeigner } = useQuery(GET_EMPLOYEE_FOREIGNER, {
    onCompleted: ({ getEmployeeForeigner }) => {
      // console.log(getEmployeeForeigner);
      setDataForeigner(getEmployeeForeigner);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });
  //
  const [dataView, setDataView] = React.useState(null);
  const { refetch } = useQuery(GET_EMPLOYEE_OVERVIEW, {
    onCompleted: ({ getEmployeeOverview }) => {
      // console.log(getEmployeeOverview);
      setDataView(getEmployeeOverview);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  React.useEffect(() => {
    refetch();
    refetchForeigner();
  }, []);

  return (
    <>
      <Grid container spacing={3} className="employee-over-view">
        <Grid item xs={12} md={6}>
          <Typography className="employee-overview-header">
            Employee Overview
          </Typography>
          <Box className="employee-total">
            <Stack direction="row" justifyContent="center">
              <Box className="left">
                <Stack direction="row" justifyContent="center">
                  <Typography className="header-number">
                    {dataView?.total ? dataView?.total : 0}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Typography align="center">Total Employee</Typography>
                </Stack>
              </Box>
              <Box className="slash"></Box>
              <Box className="right">
                <Stack direction="row" justifyContent="center">
                  <Typography className="header-number">
                    {dataView?.totalFemale ? dataView?.totalFemale : 0}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Typography align="center">Total Female</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className="employee-overview-header">
            Employee Foreigner
          </Typography>
          <Box className="employee-foriegner">
            <Stack direction="row" justifyContent="center">
              <Box className="left">
                <Stack direction="row" justifyContent="center">
                  <Typography className="header-number">
                    {dataForeigner?.total ? dataForeigner?.total : 0}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Typography align="center">Total Employee</Typography>
                </Stack>
              </Box>
              <Box className="slash"></Box>
              <Box className="right">
                <Stack direction="row" justifyContent="center">
                  <Typography className="header-number">
                    {dataForeigner?.totalFemale
                      ? dataForeigner?.totalFemale
                      : 0}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Typography align="center">Total Female</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
