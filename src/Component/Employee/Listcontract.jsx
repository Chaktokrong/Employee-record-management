import React, { useState } from "react";
import {
  Stack,
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import "./liststyle.scss";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipMove from "react-flip-move";

export default function Listcontract(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    // console.log("item::", item)
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <Grid item container spacing={1}>
              <Grid item xs={4}>
                <Typography className="list-title-field">Position:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  value={item?.in_position}
                  onChange={(e) =>
                    props?.setUpdatePositioncontract(e.target.value, item?.key)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Start date:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    inputFormat="DD/MM/yyyy"
                    value={item?.start_date}
                    onChange={(e) =>
                      props?.setUpdateStartdatecontract(e, item?.key)
                    }
                    renderInput={(params) => (
                      <TextField
                        className="input-flied"
                        {...params}
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon className="icon-date" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">End date:</Typography>
              </Grid>
              <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    inputFormat="DD/MM/yyyy"
                    value={item?.end_date}
                    onChange={(e) =>
                      props?.setUpdateEnddatecontract(e, item?.key)
                    }
                    renderInput={(params) => (
                      <TextField
                        className="input-flied"
                        {...params}
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <DateRangeIcon className="icon-date" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              {/* <Grid item xs={4}>
                <Typography className="list-title-field">
                  Public holiday:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  type="number"
                  value={item?.public_holiday}
                  onChange={(e) =>
                    props?.setUpdatePublicholidaycontract(
                      e.target.value,
                      item?.key
                    )
                  }
                />
              </Grid> */}
              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Annual leave:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  className="input-flied"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  value={item?.annual_leave}
                  onChange={(e) =>
                    props?.setUpdateAnnualLeavecontract(
                      e.target.value,
                      item?.key
                    )
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">Salary:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  className="input-flied"
                  size="small"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  value={item?.salary}
                  onChange={(e) =>
                    props?.setUpdateSalarycontract(e.target.value, item?.key)
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton
              className="btn-icon-contract"
              onClick={() => {
                props?.deleteContract(item?.key);
              }}
            >
              <DeleteIcon className="icon" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );
  });

  return (
    <FlipMove duration={300} easing="ease-in-out">
      {listItems}
    </FlipMove>
  );
}
