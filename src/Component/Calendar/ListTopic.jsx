import React from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Typography, Box, Grid, TextField } from "@mui/material";
import "./listtopic.scss";

function ListTopic(props) {
  const items = props.items;
  const listItems = items.map((item) => {
    return (
      <Box key={item.key}>
        <Grid item container spacing={0}>
          <Grid item xs={10}>
            {/* <Typography>Add topic</Typography> */}
            <TextField fullWidth placeholder="add topic" size="small" />
          </Grid>
          <Grid item xs={2}>
            <DeleteRoundedIcon
              onClick={() => {
                props.deleteItem(item.key);
              }}
              sx={{ color: "red", marginBottom: "-20px", cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  });
  return listItems;
}

export default ListTopic;
