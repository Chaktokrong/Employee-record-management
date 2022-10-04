import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  Paper,
  Modal,
  TableHead,
  Avatar,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import "./departement.scss";
import { useNavigate } from "react-router-dom";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import testAvator from "../Assets/testAvator.svg";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

//Assets
import defaultImage from "../Assets/defaultLogo.jpg";
import Administractive from "../Assets/Departement/Administractive.svg";
//component
import CreateDepartment from "../Component/Departement/CreateDepartment";
import DepartementAction from "../Component/Departement/DepartementAction";
import { GET_QUERY_DEPARTMENT } from "../Schema/Departement";
//componnent
import UpdateDepartment from "../Component/Departement/UpdateDepartment";
import DeleteDepertment from "../Component/Departement/DeleteDepertment";
import LoadingPage from "../Component/Include/LoadingPage";

import { useQuery } from "@apollo/client";
// Alert message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import Divider from "@mui/material/Divider";

export default function Departement() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // state Department
  const [rowData, setRowdata] = useState([]);
  const [page, Setpage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [userId, setUserId] = useState("");

  // Query
  const { refetch } = useQuery(GET_QUERY_DEPARTMENT, {
    variables: {
      keyword: keyword,
    },
    onCompleted: ({ getAffair }) => {
      setRowdata(getAffair);
      setLoading(false);
      console.log("getAffair::: ", getAffair);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div className="departement-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Departement</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: 300,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search..."
              size="small"
              onChange={(e) => setKeyword(e?.target?.value)}
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
        {/* <MoreVertIcon className="icons" /> */}
        <Stack direction="row" spacing={5} className="btn-add">
          <Button
            onClick={() => navigate("/departement/position")}
            endIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add"> Position </Typography>
          </Button>
        </Stack>
        <Stack direction="row" spacing={5} className="btn-add">
          <Button
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add"> Create </Typography>
          </Button>
        </Stack>
      </Stack>

      <Box className="container">
        <Box
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: "8px",
            padding: "5px",
            mb: "20px",
          }}
        >
          <Stack direction="row">
            <Stack
              direction="column"
              justifyContent="center"
              sx={{ ml: "20px", height: "40px" }}
            >
              <Typography variant="body">
                List of department that we have.
              </Typography>
            </Stack>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Stack direction="column" justifyContent="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: 300,
                  height: "100%",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
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
            </Stack> */}
          </Stack>
        </Box>
        {loading ? (
          <LoadingPage />
        ) : (
          <Grid container spacing={3} className="grid-department">
            {rowData?.map((row, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.6}>
                <Box className="container-box">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    className="container-image"
                  >
                    <Box
                      className="image_department"
                      onClick={() =>
                        navigate(`/departement/officedepartment?id=${row?._id}`)
                      }
                    >
                      {row?.image?.src !== "" && row?.image?.src !== null ? (
                        <Avatar src={row?.image?.src} className="image" />
                      ) : (
                        <img src={defaultImage} className="image" />
                      )}
                    </Box>
                  </Stack>
                  <Box className="container-text">
                    <Stack className="container-stack">
                      <Typography
                        className="title"
                        onClick={() =>
                          navigate(
                            `/departement/officedepartment?id=${row?._id}`
                          )
                        }
                      >
                        {row?.affair_name}
                      </Typography>
                      <Typography
                        className="title-sub"
                        onClick={() =>
                          navigate(
                            `/departement/officedepartment?id=${row?._id}`
                          )
                        }
                      >
                        {row?.head?.latin_name?.first_name +
                          " " +
                          row?.head?.latin_name?.last_name}
                      </Typography>
                      <Stack direction="row" className="container-icons">
                        <DepartementAction
                          handleClose={handleClose}
                          row={row}
                          setRefetch={refetch}
                          setOpenSuccess={setOpenSuccess}
                          setOpenError={setOpenError}
                          setSuccesstMessage={setSuccesstMessage}
                          setErrorMessage={setErrorMessage}
                        />
                      </Stack>
                    </Stack>
                    <Divider variant="middle" />
                    <Grid
                      item
                      container
                      spacing={3}
                      className="container-grid"
                      align="center"
                    >
                      <Grid item xs={6} sm={6} md={3} lg={6}>
                        <Stack direction="column">
                          <Typography className="number">
                            {row?.total_emp}
                          </Typography>
                          <Typography className="employee">Employee</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={6} sm={6} md={3} lg={6}>
                        <Stack direction="column">
                          <Typography className="number">
                            {row?.total_office}
                          </Typography>
                          <Typography className="Office"> Office </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <CreateDepartment
        handleClose={handleClose}
        open={open}
        btnTitle={"Create"}
        setRefetch={refetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />

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
