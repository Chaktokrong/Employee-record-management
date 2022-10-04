import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Typography, Box, Grid, TextField, IconButton } from "@mui/material";
import "./listtasks.scss";

export default function ListTasks(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <Box key={item.key} sx={{ marginBottom: "20px" }}>
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <TextField
              fullWidth
              placeholder="add task"
              size="small"
              value={item?.title}
              onChange={(e) =>
                props?.setUpdateTitle(e.target.value, item?.created_at)
              }
            />
          </Grid>
          <Grid item xs={1.5}>
            <IconButton
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.deleteTasks(item.created_at);
              }}
            >
              <DeleteRoundedIcon sx={{ color: "red" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );
  });
  return listItems;
}
