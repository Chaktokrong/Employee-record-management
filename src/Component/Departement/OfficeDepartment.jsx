import React, { useState } from "react";
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
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  Tooltip,
} from "@mui/material";
import "./officedepartment.scss";
import { useNavigate } from "react-router-dom";
import { tableCellClasses } from "@mui/material/TableCell";
// Copy MUI
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// Icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import testAvator from "../../Assets/testAvator.svg";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddIcCallOutlinedIcon from "@mui/icons-material/AddIcCallOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PreviewIcon from "@mui/icons-material/Preview";
import Divider from "@mui/material/Divider";
// Copy
import { styled } from "@mui/material/styles";
//Assets
import DefaultImage from "../../Assets/defaultLogo.jpg";
import Administractive from "../../Assets/Departement/Administractive.svg";

//component
import CreateOffice from "./CreateOffice";
import DetaildepartmentAction from "./DetaildepartmentAction";
import CreateSection from "../Section/CreateSection";
import SectionAction from "../Section/SectionAction";
import SectionDetails from "./SectionDetails";
import SectionPath from "./SectionPath";
//schema
import { GET_OFFICE_IN_OFFAIR, GET_OFFCIE_SECTION } from "../../Schema/office";
//apollo client
import { useQuery } from "@apollo/client/react";
// alert
import AlertMessage from "../AlertMessage/AlertMessage";
import { useLocation } from "react-router-dom";
import LoadingPage from "../Include/LoadingPage";
import EmptyData from "../Include/EmptyData";

export default function OfficeDepartment() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  // Get OfficeId by url
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [affairId, setAffairId] = React.useState(params.get("id"));
  React.useEffect(() => {
    setAffairId(params.get("id"));
  }, [location.search]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSection, setOpenSection] = useState(false);
  const handleOpensection = () => setOpenSection(true);
  const handleClosesection = () => setOpenSection(false);

  const [officeId, setOfficeId] = useState("");
  const [rowData, setRowdata] = useState();

  //Alert message
  const [successMessage, setSuccesstMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [officeData, setOfficeData] = useState([]);
  const { data, refetch } = useQuery(GET_OFFICE_IN_OFFAIR, {
    variables: {
      affairId: affairId,
    },
    onCompleted: ({ getOfficeInAffair }) => {
      // console.log("getOfficeInAffair", getOfficeInAffair);
      setLoading(false);
      if (getOfficeInAffair) {
        setOfficeData(getOfficeInAffair);
      }
    },
    onError: (error) => {
      setLoading(true);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [data?.getOfficeInAffair]);

  const handleRefetch = () => {
    console.log("refetch");
  };
  return (
    <div className="departmentdetail-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">
            <b
              onClick={() => navigate("/departement")}
              style={{ cursor: "pointer" }}
            >
              Departement
            </b>{" "}
            / Office
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" className="btn-add">
          <Button
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add"> Office </Typography>
          </Button>
        </Stack>
      </Stack>

      <Box className="containner">
        <Grid container spacing={5} className="container-table">
          <Grid item xs={12} md={4} lg={3}>
            {loading ? (
              <>
                <LoadingPage />
              </>
            ) : (
              <>
                {officeData?.length === 0 ? (
                  <Stack direction="row" justifyContent="center">
                    <EmptyData />
                  </Stack>
                ) : (
                  <>
                    {officeData?.map((item, index) => (
                      <Button
                        key={index}
                        fullWidth
                        onClick={() => setOfficeId(item?._id)}
                      >
                        <Stack className="Container-office" direction="column">
                          <Box className="icon-more">
                            <DetaildepartmentAction
                              item={item}
                              setRefetch={refetch}
                              handleClose={handleClose}
                              setOpenSuccess={setOpenSuccess}
                              setOpenError={setOpenError}
                              setSuccesstMessage={setSuccesstMessage}
                              setErrorMessage={setErrorMessage}
                            />
                          </Box>
                          <Box className="Container-image">
                            {item?.image?.src ? (
                              <img
                                alt="Image Logo"
                                src={item?.image?.src}
                                className="image"
                              />
                            ) : (
                              <img
                                alt="Image Logo"
                                src={DefaultImage}
                                className="image"
                              />
                            )}
                          </Box>
                          <Stack className="Container-title">
                            <Typography className="text" variant="body">
                              {item?.office_name}
                            </Typography>
                            <Typography className="text-sub" variant="body">
                              {item?.head?.latin_name?.first_name +
                                " " +
                                item?.head?.latin_name?.last_name}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Button>
                    ))}
                  </>
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <SectionPath
              officeId={officeId}
              setRefetchOffice={handleRefetch}
              setOpenSuccess={setOpenSuccess}
              setOpenError={setOpenError}
              setSuccesstMessage={setSuccesstMessage}
              setErrorMessage={setErrorMessage}
            />
          </Grid>
        </Grid>
      </Box>

      <CreateOffice
        affairId={affairId}
        open={open}
        handleClose={handleClose}
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
