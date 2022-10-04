import React, { useState } from "react";
import { Typography, TextField, Grid, Box, IconButton } from "@mui/material";
import "./liststyle.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipMove from "react-flip-move";

export default function ListInsurance(props) {
  const items = props.items;
  // console.log(props.items, "::::::items");
  const listItems = items.map((item) => {
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <Grid item container spacing={1}>
              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Institutions:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  value={item?.title}
                  onChange={(e) =>
                    props?.setUpdateTitleInsurance(e.target.value, item?.key)
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Start - End year:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  value={item?.start_end_date}
                  onChange={(e) =>
                    props?.setUpdateYearInsurance(e.target.value, item?.key)
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton
              className="btn-icon-insurance"
              onClick={() => {
                props?.deleteInsurance(item?.key);
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
