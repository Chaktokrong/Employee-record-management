import * as React from "react";
import { Box, Typography, Stack, Divider, IconButton } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
//icons
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//react fullcalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
//components
import "./viewcalendar.scss";

export default function ViewCalendar({ open, anchor, setState, toggleDrawer }) {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onOpen={toggleDrawer(anchor, true)}
      // onClose={toggleDrawer(anchor, false)}
    >
      <Box role="presentation" className="drawer-list">
        <Box sx={{ padding: "10px 15px 6px 15px" }} className="header-title">
          <Stack direction="row" className="card-stack-container">
            <Stack direction="column" justifyContent="center">
              <Typography className="box-list-item">View Calendar</Typography>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="column" justifyContent="center">
              <IconButton className="btn-icons">
                <DoDisturbOnOutlinedIcon
                  className="icons"
                  onClick={toggleDrawer(anchor, false)}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "#dceeff" }} />
        <Box className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            // initialView="timeGridDay"
            // dayGridWeek', 'timeGridDay', 'listWeek' .
            weekends={true}
            selectable={true}
            // select={handleSelect}
            // events={[storageData]}
            events={[
              {
                title: "Khmer happy new year",
                start: "2022-10-06",
                end: "2022-10-06",
                // color: "purple",
                // allDay: false, // will make the time show
              },
            ]}
            // eventBackgroundColor="orange"
            // eventColor="green"
            // eventTextColor="white"
            // header={{
            //   left: "prev,next today",
            //   center: "test title",
            //   right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            // }}
            // eventClick={console.log}
          />
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
