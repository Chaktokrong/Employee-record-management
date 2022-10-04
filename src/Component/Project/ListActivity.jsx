import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Typography,
  Box,
  Grid,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import "./listactivity.scss";

export default function ListActivity(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <Box key={item.key} sx={{ marginBottom: "20px" }}>
        <Grid item container spacing={2}>
          <Grid item xs={1.5}>
            <Avatar src="" alt="Users" />
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              placeholder="add tasks"
              size="small"
              value={item?.title}
              onChange={(e) =>
                props?.setUpdateDescription(e.target.value, item?.created_at)
              }
            />
          </Grid>
          <Grid item xs={1.5}>
            <IconButton
              sx={{ cursor: "pointer" }}
              onClick={() => {
                props.deleteActivity(item.created_at);
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
