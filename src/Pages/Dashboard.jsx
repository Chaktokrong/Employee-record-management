import * as React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import "./dashboard.scss";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import { withStyles } from "@material-ui/core/styles";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import Switch from "@mui/material/Switch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

//Component
import EmployeeChart from "../Component/Dashboard/EmployeeChart";
import StaffsSituation from "../Component/Dashboard/StaffsSituation";
import StaffAttendanceChart from "../Component/Dashboard/StaffAttendanceChart";
import EmployeeOverview from "../Component/Dashboard/EmployeeOverview";
import ContractEmployee from "../Component/Dashboard/ContractEmployee";
import PayrollEmployee from "../Component/Dashboard/PayrollEmployee";
import UpComingMeetting from "../Component/Dashboard/UpComingMeetting";
import { AuthContext } from "../context/AuthContext";
export default function Dashboard() {
  //switch
  // noneUserAccesse(["employee"]) === "none";
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  //e
  // noneUserAccesse(["admin", "employee"])
  const { noneUserAccesse } = React.useContext(AuthContext);
  // console.log(noneUserAccesse(["employee"]));
  return (
    <div className="dashboard-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Dashboard</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 300,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <TextField
              className="text-field"
              fullWidth
              placeholder="Search Dashboard"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={3}>
          {/*  */}
          <Grid item xs={12} sm={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <EmployeeOverview />
              </Grid>
              <Grid item xs={12}>
                <EmployeeChart />
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={12} sm={12} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StaffAttendanceChart />
              </Grid>
              <Grid item xs={12}>
                <ContractEmployee />
              </Grid>
            </Grid>
          </Grid>
          {/*  */}
          <Grid item xs={12} sm={12} md={6}>
            <PayrollEmployee />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <UpComingMeetting />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
