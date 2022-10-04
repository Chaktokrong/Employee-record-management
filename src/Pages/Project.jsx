import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  TableHead,
  Avatar,
} from "@mui/material";
import "./project.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
// Alert message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
// Components
import { GET_PROJECT_WITH_PAGINAION } from "../Schema/Project";
import CreateCalendar from "../Component/Calendar/CreateCalendar";
import ProjectCard from "../Component/Project/ProjectCard";
import CreateTasks from "../Component/Project/CreateTasks";
import ViewCalendar from "../Component/Project/ViewCalendar";

export default function Project() {
  //function create tasks
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //function open calendar
  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [projectData, setProjectData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");

  // Query
  const { refetch } = useQuery(GET_PROJECT_WITH_PAGINAION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: false,
    },
    onCompleted: ({ getProjectWithPagination }) => {
      setProjectData(getProjectWithPagination);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  // console.log("projectData::", projectData);

  return (
    <div className="project-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> Project </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right" spacing={2}>
          <Box className="container-textField">
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="container-textField">
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple={true} size="small">
                      <TuneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="container-textField-button">
            <Button
              className="btn-calendar"
              startIcon={<InsertInvitationIcon sx={{ color: "#000" }} />}
              fullWidth
              onClick={toggleDrawer("bottom", true)}
            >
              Calendar
            </Button>
            <ViewCalendar
              anchor={"bottom"}
              open={state["bottom"]}
              setState={setState}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </Stack>
        <MoreVertIcon className="icons" />
        <Stack direction="row" spacing={5} className="btn-add">
          <Button
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add"> CREATE </Typography>
          </Button>
        </Stack>
      </Stack>

      <Box className="card-container">
        <Grid container spacing={4}>
          {projectData?.data?.map((data, index) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
              <ProjectCard
                data={data}
                setRefetch={refetch}
                setErrorMessage={setErrorMessage}
                setSuccesstMessage={setSuccesstMessage}
                setOpenSuccess={setOpenSuccess}
                setOpenError={setOpenError}
              />
            </Grid>
          ))}
        </Grid>

        <CreateTasks
          handleClose={handleClose}
          open={open}
          setRefetch={refetch}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
          setSuccesstMessage={setSuccesstMessage}
          setErrorMessage={setErrorMessage}
        />

        {/* <CreateTasks
          handleDelete={handleDelete}
          setStorageData={setStorageData}
          storageData={storageData}
          setValues={setValues}
          values={values}
          open={open}
          handleClose={handleClose}
          startDate={startDate}
          endDate={endDate}
        /> */}
      </Box>

      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
}
