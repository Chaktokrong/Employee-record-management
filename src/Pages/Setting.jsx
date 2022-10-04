import React, { useState, useEffect } from "react";
import { Typography, Stack, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./setting.scss";
//icon
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";

export default function Setting() {
  return (
    <div className="setting-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> Setting </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
      </Stack>

      <Box className="container">
        <Box sx={{ mt: 5, mb: 3 }}>
          <Typography variant="body">
            Edit abilities of system can do.
          </Typography>
        </Box>

        <Grid container spacing={5} className="grid">
          <Grid item xs={12} sm={12} md={6} lg={4} className="grid-item">
            <Box className="box-item">
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                  <Stack direction="column" justifyContent="center" spacing={2}>
                    <RoomPreferencesIcon className="icon" />
                  </Stack>
                  <Stack direction="column" justifyContent="center" spacing={1}>
                    <Link
                      to="/system-setting/branch-location"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className="text-title">
                        Branch & Location
                      </Typography>
                    </Link>
                    <Typography variant="body">
                      Set up branch name & location for controlling.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} className="grid-item">
            <Box className="box-item">
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                  <Stack direction="column" justifyContent="center" spacing={2}>
                    <BrowseGalleryIcon className="icon" />
                  </Stack>
                  <Stack direction="column" justifyContent="center" spacing={1}>
                    <Link
                      to="/system-setting/public-holiday"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className="text-title">
                        Public Holiday
                      </Typography>
                    </Link>
                    <Typography variant="body">
                      Set up & Edit Public Holiday for each year.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} className="grid-item">
            <Box className="box-item">
              <Stack
                direction="column"
                justifyContent="center"
                spacing={2}
                sx={{ height: "100%" }}
              >
                <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                  <Stack direction="column" justifyContent="center" spacing={2}>
                    <WorkHistoryIcon className="icon" />
                  </Stack>
                  <Stack direction="column" justifyContent="center" spacing={1}>
                    <Link
                      to="/system-setting/typeof-timeoff"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography className="text-title">
                        Type of Time Off
                      </Typography>
                    </Link>
                    <Typography variant="body">
                      Create & Edit Type of Time Off that you need.
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
