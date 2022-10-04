import { Box, Stack, Typography } from "@mui/material";
import "./upcomingmeeting.scss";
import PunchClockIcon from "@mui/icons-material/PunchClock";

export default function UpComingMeetting() {
  const rows = [1, 2, 3, 4, 5];
  return (
    <>
      <Box className="upcoming-employee">
        <Typography className="employee-overview-header">
          Up Coming Meeting
        </Typography>
        <Stack direction="column" spacing={2}>
          {rows?.map((row, index) => (
            <Stack
              key={index}
              direction="row"
              width="100%"
              className="data-row"
            >
              <Box width="5%" className="box">
                <PunchClockIcon className="icon-alarm" />
              </Box>
              <Box width="35%" ml={2} className="box">
                <Typography>Annual Reflection Meeting</Typography>
              </Box>
              <Box width="20%" className="box">
                <Typography>CCI Office</Typography>
              </Box>
              <Stack direction="row" justifyContent="right" width="40%">
                <Typography>Sep 20, 2022 8:00 - 12:00 AM </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
}
