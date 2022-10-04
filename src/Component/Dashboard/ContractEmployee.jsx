import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Button,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import "./contractemployee.scss";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { GET_CONTRACT_REMINDER } from "../../Schema/Dashbord";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function ContractEmployee() {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);
  const { data } = useQuery(GET_CONTRACT_REMINDER, {
    onCompleted: ({ getContractReminder }) => {
      setRowData(getContractReminder);
    },
  });

  return (
    <>
      <Box className="contract-employee">
        <Typography className="employee-overview-header">
          Contract's Employee
        </Typography>
        <Stack direction="row" className="body-contract">
          <Box className="left">
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Stack direction="row" spacing={2}>
                <PendingActionsIcon className="icon-pendding" />
                <Stack direction="column" justifyContent="center">
                  <Typography className="text">Contract will expire</Typography>
                </Stack>
              </Stack>
              <Button
                className="btn-check-expire"
                onClick={() => {
                  navigate("/employee");
                }}
              >
                Click to check expire
              </Button>
            </Stack>
          </Box>
          <Box className="right">
            <Stack direction="column" justifyContent="center" spacing={2}>
              <Stack
                direction="column"
                justifyContent="center"
                sx={{ height: "45px" }}
              >
                <Stack direction="row" justifyContent="right" spacing={2}>
                  <Typography className="text">Expiring this month</Typography>
                </Stack>
              </Stack>
              <AvatarGroup total={4} className="avatar-group">
                {rowData?.map((row, index) => (
                  <Avatar
                    alt={`${row?.reference_file_name}`}
                    src={`${row?.reference_file_src}`}
                    sx={{ width: "45px", height: "45px" }}
                  />
                ))}
              </AvatarGroup>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
