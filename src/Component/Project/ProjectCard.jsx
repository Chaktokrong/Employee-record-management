import React, { useState, useEffect } from "react";
import "./projectcard.scss";
import {
  Box,
  Grid,
  Avatar,
  AvatarGroup,
  Typography,
  Modal,
  Button,
  Stack,
} from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useQuery } from "@apollo/client";
//components
// import ProjectDetails from "../projectDetails/ProjectDetails";
import ProjectDetails from "./ProjectDetails";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#5b5bf6" : "#5b5bf6",
  },
}));

export default function ProjectCard({
  data,
  setRefetch,
  setErrorMessage,
  setSuccesstMessage,
  setOpenSuccess,
  setOpenError,
}) {
  //details function
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetails = () => setOpenDetails(true);
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  // console.log("data:::", data);

  // console.log(data?.tasks.filter((e) => e?.percent === 100)?.length, "all data");
  const currentDate = new Date();
  const endDateProject = new Date(data?.dueDate);

  //   function difference(date1, date2) {
  //     const date1utc = Date.UTC(
  //       date1.getFullYear(),
  //       date1.getMonth(),
  //       date1.getDate()
  //     );
  //     const date2utc = Date.UTC(
  //       date2.getFullYear(),
  //       date2.getMonth(),
  //       date2.getDate()
  //     );
  //     let day = 1000 * 60 * 60 * 24;
  //     return (date2utc - date1utc) / day;
  //   }

  //   console.log(row, "row Data");
  return (
    <div>
      <Box className="project-card" onClick={handleOpenDetails}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box className="day-left">
              {/* {row?.progress !== 100 ? ( */}
              <>
                {/* {difference(currentDate, endDateProject) > 0 ? ( */}
                <Stack direction="row" spacing={1}>
                  <AccessAlarmsIcon className="day-left-icon" />
                  <Typography variant="p">
                    {/* {difference(currentDate, endDateProject) + " Days left"} */}
                  </Typography>
                </Stack>
                {/* ) : null}
                {difference(currentDate, endDateProject) < 0 ? ( */}
                <Stack direction="row" spacing={1}>
                  <AccessAlarmsIcon
                    sx={{ color: "red" }}
                    className="day-left-icon"
                  />
                  <Typography variant="p" sx={{ color: "red" }}>
                    {/* {"Late " +
                      difference(currentDate, endDateProject) * -1 +
                      " Day"} */}
                  </Typography>
                </Stack>
                {/* ) : null} */}
                {/* {difference(currentDate, endDateProject) === 0 ? ( */}
                <Stack direction="row" spacing={1}>
                  <AccessAlarmsIcon
                    sx={{ color: "orange" }}
                    className="day-left-icon"
                  />
                  <Typography variant="p" sx={{ color: "orange" }}>
                    Done Today
                  </Typography>
                </Stack>
                {/* ) : null} */}
              </>
              {/* ) : ( */}
              <>
                <Stack direction="row" spacing={1}>
                  <CheckCircleOutlineIcon
                    sx={{ color: "green" }}
                    className="day-left-icon"
                  />
                  <Typography variant="p" sx={{ color: "green" }}>
                    Completed
                  </Typography>
                </Stack>
              </>
              {/* )} */}
            </Box>
          </Grid>
          <Grid item xs={6} className="icons">
            <MoreHorizIcon className="action-icon" />
          </Grid>
          <Grid item xs={12}>
            <Box className="card-title">{data?.title}</Box>
          </Grid>
          <Grid item xs={12}>
            <Box>{data?.description}</Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} className="card-date">
                <Typography>Tasks Done:</Typography>
                <Typography className="date">
                  {/* {row?.tasks.filter((e) => e?.percent === 100)?.length}/
                  {row?.tasks?.length} */}
                </Typography>
              </Grid>

              <Grid item xs={6} className="tasks">
                <Typography className="task-name">Inprogress</Typography>
              </Grid>
              <Grid item xs={6} className="percent-progress">
                {/* {row?.progress?.toFixed(2)}% */}
                progress
              </Grid>
              <Grid item xs={12}>
                <BorderLinearProgress variant="determinate" value={20} />
              </Grid>
              <Grid item xs={12} className="group-avatar">
                <AvatarGroup max={6}>
                  {data?.labels?.map((data) => (
                    <Avatar
                      className="avatar"
                      alt={data?.affair_name}
                      src={`${data?.image?.src}`}
                    />
                  ))}
                  {data?.asign_to?.map((data) => (
                    <Avatar
                      className="avatar"
                      alt={data?.latin_name?.first_name}
                      src={`${data?.image?.src}`}
                    />
                  ))}
                </AvatarGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <ProjectDetails
        editData={data}
        handleClose={handleCloseDetails}
        open={openDetails}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
