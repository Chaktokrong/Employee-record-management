import React from "react";
import "./benefits.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Stack, Grid, Box, CircularProgress, Typography } from "@mui/material";

export default function Benefits() {
  return (
    <Grid item container spacing={3} className="grid-benefits">
      <Grid item xs={12}>
        <Box className="benefits-one">
          <Box className="benefits-container">
            {/* <Typography className="benefits-title">
              Total
            </Typography> */}
            <Box>
              <CircularProgress
                variant="determinate"
                value={75}
                size={120}
                thickness={4}
              />
            </Box>
            <Stack direction="column" marginLeft="20px">
              <Box className="total-employee">ភាគទាន ប.ស.ស</Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box className="number-employee">៣,៣៣៤,៤៤៥ រៀល</Box>
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className="benefits-one">
          <Box className="benefits-container">
            <Box>
              <CircularProgress
                variant="determinate"
                value={75}
                size={120}
                thickness={4}
              />
            </Box>
            <Stack direction="column" marginLeft="20px">
              <Box className="total-employee">ភាគទាន ប.ស.ស</Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box className="number-employee">៣,៣៣៤,៤៤៥ រៀល</Box>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
