import React, { useState } from "react";
import { Box, TextField, Grid, Typography, IconButton } from "@mui/material";
import "./liststyle.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipMove from "react-flip-move";

export default function ListExperience(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  className="input-flied"
                  size="small"
                  value={item?.company}
                  onChange={(e) =>
                    props.setUpdateCompanyExperience(e.target.value, item?.key)
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
                    props.setUpdateTitleExperience(e.target.value, item?.key)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  multiline
                  fullWidth
                  className="input-flied"
                  value={item?.start_end_date}
                  onChange={(e) =>
                    props.setUpdateYearExperience(e.target.value, item?.key)
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton
              className="btn-icon-experience"
              onClick={() => {
                props.deleteItemExperien(item?.key);
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
