import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./publicholiday.scss";
import PublicHolidayByMonth from "./PublicHolidayByMonth";
import { useNavigate } from "react-router-dom";

export default function PublicHoliday() {
  const navigate = useNavigate();

  const [countDay, setCountDay] = useState(0);
  const [monthSeleced, setMonthSeleced] = useState("January");

  const MonthofYear = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="set-public-holiday">
        <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="column" justifyContent="center">
            <Typography className="color">
              <b
                onClick={() => navigate("/system-setting")}
                style={{ cursor: "pointer" }}
              >
                Setting{" "}
              </b>
              / Public Holiday
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
        </Stack>

        <Box className="container">
          <Box sx={{ mt: 5, mb: 3 }}>
            <Typography variant="body">
              Total: {countDay} days / a years
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {/* <Grid className="btn-select" item xs={12} md={3}>
              <Stack
                direction="row"
                flexDirection="column"
                justifyContent="center"
              >
                {MonthofYear?.map((row, index) => (
                  <Box key={index} className="btn-seletec-month">
                    <Button
                      variant="text"
                      fullWidth
                      className="btn"
                      onClick={() => {
                        setMonthSeleced(row);
                        // setMonthNumber(index + 1);
                      }}
                    >
                      {row}
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Grid> */}

            <Grid className="list-select" item xs={12} md={6} lg={3} xl={3}>
              <FormControl fullWidth>
                <Select
                  size="small"
                  value={monthSeleced}
                  onChange={(e) => {
                    setMonthSeleced(e.target.value);
                  }}
                >
                  {MonthofYear?.map((row, index) => (
                    <MenuItem value={`${row}`} key={index}>
                      {row}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box className="form-set-up">
                <PublicHolidayByMonth
                  monthSeleced={monthSeleced}
                  MonthofYear={MonthofYear}
                  setCountDay={setCountDay}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
