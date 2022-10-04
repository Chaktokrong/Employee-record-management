import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import "./Employee.scss";
// alert
import AlertMessage from "../Component/AlertMessage/AlertMessage";
//icon
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmptyData from "../Component/Include/EmptyData";
//Component
import ModalEmployeeAdd from "../Component/Employee/ModalEmployeeAdd";
import { GET_EMPLOYEE_WITH_PAGINATION } from "../Schema/Employee";
import { useQuery } from "@apollo/client";
import LoadingPage from "../Component/Include/LoadingPage";
import EmployeeAction from "../Component/Employee/EmployeeAction";

export default function Employee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //handal open
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  //switch
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  //end
  const [rowData, setRowdata] = useState([]);
  const [page, Setpage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  //get employeee
  const { data, refetch } = useQuery(GET_EMPLOYEE_WITH_PAGINATION, {
    variables: {
      page: keyword !== "" ? 1 : page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getEmployeePagination }) => {
      setRowdata(getEmployeePagination);
      setLoading(false);
      // console.log("getEmployeePagination::: ", getEmployeePagination);
    },
    onError: (error) => {
      console.log(error?.message);
      setLoading(true);
    },
  });

  useEffect(() => {
    refetch();
  }, [keyword, page]);

  return (
    <div className="employee-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> Employee </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" justifyContent="right">
          <Box className="box-container">
            <TextField
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search..."
              size="small"
              onChange={(e) => setKeyword(e.target.value)}
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
        <MoreVertIcon className="icons" />
        <Stack direction="row" spacing={2} className="btn-add">
          <Button
            onClick={handleOpen}
            endIcon={<AddCircleOutlineIcon />}
            sx={{ color: "white" }}
          >
            <Typography className="style-add"> CREATE </Typography>
          </Button>
        </Stack>
      </Stack>

      {/* table */}
      <Box className="container">
        <TableContainer>
          <Table className="table-head">
            <TableHead>
              <TableRow className="table-row">
                <TableCell className="header-title" width="5%">
                  <Stack direction="row" spacing={0} width="100%">
                    <Typography className="filter-title" align="left">
                      Emp ID
                    </Typography>

                    <IconButton className="filter-btn">
                      <FilterListIcon className="filter-icons" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell className="header-title" width="20%">
                  <Stack direction="row" spacing={0}>
                    <Typography className="filter-title">
                      Name in Khmer
                    </Typography>
                    <IconButton className="filter-btn">
                      <FilterListIcon className="filter-icons" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell className="header-title" width="10%">
                  Gender
                </TableCell>
                <TableCell className="header-title" width="20%">
                  Positions
                </TableCell>
                <TableCell className="header-title" width="20%">
                  Shift
                </TableCell>
                <TableCell className="header-title" width="20%">
                  <Stack direction="row" spacing={0}>
                    <Typography className="filter-title">
                      Contract expire
                    </Typography>
                    <IconButton className="filter-btn">
                      <FilterListIcon className="filter-icons" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell className="header-title" align="right"></TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <TableHead>
                <TableRow className="table-row">
                  <TableCell className="header-title" colSpan={6}>
                    <LoadingPage />
                  </TableCell>
                </TableRow>
              </TableHead>
            ) : rowData?.data?.length !== 0 ? (
              <>
                {rowData?.data?.map((item, index) => (
                  <TableBody key={index} className="body">
                    <TableRow className="body-row">
                      <TableCell className="first-body-title" width="10%">
                        {item?.employee_id ? item?.employee_id : "---:---"}
                      </TableCell>
                      <TableCell
                        className="body-title"
                        width="20%"
                        onClick={() =>
                          navigate(`/employee/employeedetail?id=${item?._id}`)
                        }
                      >
                        <Stack direction="row" spacing={2}>
                          <Avatar src={`${item?.image?.src}`} />
                          <Stack direction="column" justifyContent="center">
                            <Typography className="body-title">
                              {item?.khmer_name?.first_name}{" "}
                              {item?.khmer_name?.last_name}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell
                        className="body-title"
                        width="10%"
                        onClick={() =>
                          navigate(`/employee/employeedetail?id=${item?._id}`)
                        }
                      >
                        {item?.gender}
                      </TableCell>
                      <TableCell
                        className="body-title"
                        width="20%"
                        onClick={() =>
                          navigate(`/employee/employeedetail?id=${item?._id}`)
                        }
                      >
                        {item?.position ? item?.position : "---:---"}
                      </TableCell>
                      <TableCell
                        className="body-title"
                        width="20%"
                        onClick={() =>
                          navigate(`/employee/employeedetail?id=${item?._id}`)
                        }
                      >
                        {item?.shift ? item?.shift : "---:---"}
                      </TableCell>
                      <TableCell
                        className="body-title"
                        width="20%"
                        onClick={() =>
                          navigate(`/employee/employeedetail?id=${item?._id}`)
                        }
                      >
                        ---:---
                      </TableCell>
                      <TableCell className="last-body-title" align="right">
                        <EmployeeAction
                          editData={item}
                          setRefetch={refetch}
                          setOpenSuccess={setOpenSuccess}
                          setOpenError={setOpenError}
                          setSuccesstMessage={setSuccesstMessage}
                          setErrorMessage={setErrorMessage}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </>
            ) : (
              <>
                <EmptyData />
              </>
            )}
          </Table>
        </TableContainer>

        <Stack
          direction="row"
          justifyContent="right"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <IconButton>
            <ArrowBackIosNewIcon sx={{ ":hover": { color: "#0969A0" } }} />
          </IconButton>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Pagination hideNextButton={true} hidePrevButton={true} />
          </Stack>
          <IconButton>
            <ArrowForwardIosIcon sx={{ ":hover": { color: "#0969A0" } }} />
          </IconButton>
        </Stack>
      </Box>

      <ModalEmployeeAdd
        handleClose={handleClose}
        open={open}
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
