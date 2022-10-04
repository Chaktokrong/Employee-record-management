import React, { useState } from "react";
import { Box, TextField, Grid, Typography, IconButton } from "@mui/material";
import "./liststyle.scss";
// Icon
import DeleteIcon from "@mui/icons-material/Delete";
import FlipMove from "react-flip-move";

// Date Picker
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ListEducation(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    // console.log(item)
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10}>
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  size="small"
                  className="input-flied"
                  value={item?.school}
                  onChange={(e) =>
                    props.setUpdateSchool(e.target.value, item?.key)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  multiline
                  fullWidth
                  className="input-flied"
                  value={item?.title}
                  onChange={(e) =>
                    props.setUpdateTitle(e.target.value, item?.key)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  multiline
                  fullWidth
                  width="100%"
                  className="input-flied"
                  value={item?.start_end_date}
                  onChange={(e) =>
                    props.setUpdateYear(e.target.value, item?.key)
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <IconButton
              className="btn-icon-experience"
              onClick={() => {
                props.deleteItem(item?.key);
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
