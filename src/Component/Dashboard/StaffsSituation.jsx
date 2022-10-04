import React, { useState } from "react";
import "./staffssituation.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Stack, Grid, Box } from "@mui/material";
import { useQuery } from "@apollo/client";

import {
  GET_QUERY_NEWSTAFF,
  GET_QUERY_RESIGN_STAFF,
  GET_QUERY_ABSENCE_PERMISSION,
  GET_QUERY_ABSENCE_NOT_PAY,
} from "../../Schema/Dashbord";

export default function StaffsSituation() {
  // Query

  const [newStaff, setNewStaff] = useState(null);
  const { refetch: refetchNewStaffs } = useQuery(GET_QUERY_NEWSTAFF, {
    onCompleted: ({ getNewStaff }) => {
      // console.log(getNewStaff, ":::getNewStaff")
      setNewStaff(getNewStaff);
    },
  });

  const [resignStaff, setResignStaff] = useState();
  const { refetch: refetchResignStaff } = useQuery(GET_QUERY_RESIGN_STAFF, {
    onCompleted: ({ getEmpResign }) => {
      // console.log(getEmpResign, ":::getEmpResign")
      setResignStaff(getEmpResign[0]?.total);
    },
  });

  const [absencePer, setAbsenceper] = useState(null);
  const { refetch: refetchAbsencePer } = useQuery(
    GET_QUERY_ABSENCE_PERMISSION,
    {
      onCompleted: ({ getEmpPermission }) => {
        // console.log("getEmpPermission:::", getEmpPermission)
        setAbsenceper(getEmpPermission);
      },
    }
  );

  const [absenceNotpay, setAbsenceNotpay] = useState(null);
  const { refetch: refetchAbsenceNotpay } = useQuery(
    GET_QUERY_ABSENCE_NOT_PAY,
    {
      onCompleted: ({ getEmpAbsence }) => {
        // console.log("getEmpAbsence::", getEmpAbsence)
        setAbsenceNotpay(getEmpAbsence);
      },
    }
  );

  return (
    <Grid item container spacing={3} className="grid-employee">
      <Grid item xs={12} md={6} lg={3}>
        <Box className="employee-one">
          <Box className="box-icon">
            <PeopleAltIcon className="icon" />
          </Box>
          <Stack direction="column" marginLeft="20px">
            <Box className="total-employee">New staffs</Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box className="number-employee">{newStaff}</Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box className="employee-two">
          <Box className="box-icon">
            <PeopleAltIcon className="icon" />
          </Box>
          <Stack direction="column" marginLeft="20px">
            <Box className="total-employee">Resign staffs</Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box className="number-employee">{resignStaff}</Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box className="employee-three">
          <Box className="box-icon">
            <PeopleAltIcon className="icon" />
          </Box>
          <Stack direction="column" marginLeft="20px">
            <Box className="total-employee">Absent have permission</Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box className="number-employee">{absencePer}</Box>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Box className="employee-four">
          <Box className="box-icon">
            <PeopleAltIcon className="icon" />
          </Box>
          <Stack direction="column" marginLeft="20px">
            <Box className="total-employee">Absent not pay</Box>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box className="number-employee">{absenceNotpay}</Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
