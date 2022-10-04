import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Tab,
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Grid,
} from "@mui/material";
import "./shift.scss";
import { useNavigate } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
// Alert message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import GetAppIcon from "@mui/icons-material/GetApp";
// Components
import StatusCard from "../Component/Shift/StatusCard";
import CreateShift from "../Component/Shift/CreateShift";
import { GET_SHIFT_WITH_PAGINATION } from "../Schema/Shift";

export default function Shift() {
  //
  const [value, setValue] = React.useState("Time off");
  const [status, setStatus] = React.useState("Pending");

  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [rowData, setRowdata] = useState([]);
  const [page, Setpage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  // console.log("value, status::>>>", value, status);

  //get shift
  const {
    data: officeData,
    error,
    refetch,
  } = useQuery(GET_SHIFT_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
      requestType: value,
      status: status,
    },
    onCompleted: ({ getShiftPagination }) => {
      // console.log(getShiftPagination?.shift);
      if (getShiftPagination?.shift?.length !== 0) {
        setRowdata(getShiftPagination?.shift);
      } else {
        setRowdata([]);
      }
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [value, status]);

  return (
    <div className="shift-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> Shift </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right">
          <Box className="container-textField">
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search"
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
        </Stack>

        <Button
          onClick={toggleDrawer("right", true)}
          endIcon={<GetAppIcon sx={{ color: "#fff" }} />}
          className="btn-add"
        >
          <Typography className="style-add"> REQUEST </Typography>
        </Button>
        <CreateShift
          anchor={"right"}
          open={state["right"]}
          setState={setState}
          toggleDrawer={toggleDrawer}
          setRefetch={refetch}
          setOpenSuccess={setOpenSuccess}
          setOpenError={setOpenError}
          setSuccesstMessage={setSuccesstMessage}
          setErrorMessage={setErrorMessage}
        />
      </Stack>

      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <Grid item container spacing={3}>
          <Grid item xs={6} md={2}>
            <Badge badgeContent={4} color="error" sx={{ width: "100%" }}>
              <Button
                onClick={() => {
                  setValue("Time off");
                  setStatus("Pending");
                }}
                sx={{
                  bgcolor: value === "Time off" ? "orange" : "#fff",
                  color: value === "Time off" ? "#fff" : "orange",
                }}
                className="button-status"
              >
                Time Off
              </Button>
            </Badge>
          </Grid>
          <Grid item xs={6} md={2}>
            <Badge badgeContent={3} color="error" sx={{ width: "100%" }}>
              <Button
                onClick={() => {
                  setValue("Over time");
                  setStatus("Pending");
                }}
                sx={{
                  bgcolor: value === "Over time" ? "#0F81C2" : "#fff",
                  color: value === "Over time" ? "#fff" : "#0F81C2",
                }}
                className="button-status"
              >
                Over Time
              </Button>
            </Badge>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              onClick={() => {
                setValue("");
                setStatus("Approved");
              }}
              sx={{
                bgcolor: status === "Approved" ? "green" : "#fff",
                color: status === "Approved" ? "#fff" : "green",
              }}
              className="button-status"
            >
              Approved
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              onClick={() => {
                setValue("");
                setStatus("Rejected");
              }}
              sx={{
                bgcolor: status === "Rejected" ? "red" : "#fff",
                color: status === "Rejected" ? "#fff" : "red",
              }}
              className="button-status"
            >
              Rejected
            </Button>
          </Grid>
          <Grid item xs={6} md={4} />
        </Grid>
        <Box>
          {status === "Pending" && value === "Time off" ? (
            <StatusCard
              status={"Pending"}
              value={"Time off"}
              rowDatas={rowData}
              setRefetch={refetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : status === "Pending" && value === "Over time" ? (
            <StatusCard
              status={"Pending"}
              value={"Over time"}
              rowDatas={rowData}
              setRefetch={refetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : status === "Approved" ? (
            <StatusCard
              status={"Approved"}
              rowDatas={rowData}
              setRefetch={refetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : status === "Rejected" ? (
            <StatusCard
              status={"Rejected"}
              rowDatas={rowData}
              setRefetch={refetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            ""
          )}
        </Box>
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
