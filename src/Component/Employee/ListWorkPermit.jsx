import React, { useState } from "react";
import {
  InputAdornment,
  TextField,
  Grid,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import "./liststyle.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FlipMove from "react-flip-move";

export default function ListWorkPermit(props) {
  const items = props.items;
  // console.log(props.items, "::::::items");
  const listItems = items.map((item) => {
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <Grid item container spacing={1}>
              <Grid item xs={4}>
                <Typography className="list-title-field">Name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  value={item?.work_permit_name}
                  onChange={(e) =>
                    props?.setUpdateNameWorkPermit(e.target.value, item?.key)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Expire date:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    inputFormat="DD/MM/yyyy"
                    value={item?.expire_date}
                    onChange={(e) =>
                      props?.setUpdateExpireWorkPermit(e, item?.key)
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
            </Grid>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton
              className="btn-icon-insurance"
              onClick={() => {
                props?.deleteWorkPermit(item?.key);
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
