import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  TableHead,
  Avatar,
} from "@mui/material";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Alert message
import AlertMessage from "../Component/AlertMessage/AlertMessage";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Components
import UserForm from "../Component/User/UserForm";
import UserformAction from "../Component/User/UserformAction";
import { GET_USER_WITH_PAGINATION } from "../Schema/User";
import LoadingPage from "../Component/Include/LoadingPage";

export default function User() {
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

  // get user
  const [rowData, setRowdata] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  // console.log("keyword::::", keyword);

  // Query
  const { refetch } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getUserPagination }) => {
      setRowdata(getUserPagination);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
  });

  useEffect(() => {
    setShowPage(page);
  }, [page, keyword]);

  return (
    <div className="user-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> User </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" justifyContent="right">
          <Box className="container-textField">
            <TextField
              className="text-field"
              fullWidth
              placeholder="Name"
              size="small"
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <IconButton disableRipple={true} size="small">
                //       <TuneIcon />
                //     </IconButton>
                //   </InputAdornment>
                // ),
              }}
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

      <Box className="container">
        <TableContainer>
          <Table
            sx={{ minWidth: 450 }}
            className="table"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-title" width="8%">
                  N°
                </TableCell>
                <TableCell className="header-title" width="25%">
                  Full Name
                </TableCell>
                <TableCell className="header-title" width="25%">
                  Email
                </TableCell>
                <TableCell className="header-title" width="20%">
                  Role
                </TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <TableBody>
                <TableRow className="header-row">
                  <TableCell className="header-title" colSpan={4}>
                    <LoadingPage />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              rowData?.users?.map((row, index) => {
                return (
                  <TableBody className="body" key={index}>
                    <TableRow className="body-row">
                      <TableCell className="body-title-first">
                        {index + 1}-
                      </TableCell>
                      <TableCell className="body-title">
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            src={`${row?.image?.src}`}
                            sx={{ width: "40px", height: "40px" }}
                          />
                          <Stack direction="column" justifyContent="center">
                            {row?.first_name + " " + row?.last_name}{" "}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell className="body-title">{row?.email}</TableCell>
                      <TableCell className="body-title">
                        {row?.role === "admin" ? "Admin" : "Super Admin"}
                      </TableCell>
                      <TableCell className="body-title-last" align="right">
                        <UserformAction
                          row={row}
                          setRefetch={refetch}
                          setOpenSuccess={setOpenSuccess}
                          setOpenError={setOpenError}
                          setSuccesstMessage={setSuccesstMessage}
                          setErrorMessage={setErrorMessage}
                          handleClose={handleClose}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })
            )}
          </Table>
        </TableContainer>
      </Box>

      <UserForm
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
