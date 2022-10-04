import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Table,
  Paper,
  TableRow,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import "./position.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BRANCH } from "../../Schema/Setting";
import { GET_JOB_TITLE_WITH_PAGINATION } from "../../Schema/JobTitle";
// component
import CreatePosition from "./CreatePosition";
import PositionAction from "./PositionAction";
// Alert message
import AlertMessage from "../AlertMessage/AlertMessage";
import LoadingPage from "../Include/LoadingPage";
import EmptyData from "../Include/EmptyData";
// icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export default function Position() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  //
  const [pageShow, setPageShow] = useState(2);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [keyword, setKeyword] = useState("");
  const [dataView, setDataView] = useState([]);
  const { data, refetch } = useQuery(GET_JOB_TITLE_WITH_PAGINATION, {
    variables: {
      page: keyword !== "" ? 1 : page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getJobTitlesPagination }) => {
      console.log(getJobTitlesPagination);
      setLoading(false);
      setDataView(getJobTitlesPagination?.jobTitles);
    },
    onError: (error) => {
      console.log(error.message);
      setLoading(true);
    },
  });

  useEffect(() => {
    refetch();
    setPageShow(page);
  }, [page, keyword]);

  console.log(pageShow);

  return (
    <>
      <div className="position-pages">
        <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="column" justifyContent="center">
            <Typography className="color">
              <b
                onClick={() => navigate("/departement")}
                style={{ cursor: "pointer" }}
              >
                Department{" "}
              </b>
              / Position
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
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
          <Box sx={{ paddingBottom: 1 }}>
            <TableContainer>
              <Table className="table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ padding: "10px 20px" }}>
                      <Typography className="head-list-title" variant="body">
                        List of position.
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ padding: "10px 20px" }}>
                      <Stack
                        direction="row"
                        justifyContent="right"
                        width="100%"
                      >
                        <Box className="container-textField">
                          <TextField
                            className="text-field"
                            fullWidth
                            id="input-with-sx"
                            placeholder="Search"
                            size="small"
                            onChange={(e) => setKeyword(e?.target?.value)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>

                  <TableRow className="header-row">
                    <TableCell className="header-title-first">No</TableCell>
                    <TableCell className="header-title">
                      Position Name
                    </TableCell>
                    <TableCell className="header-title">Descrition</TableCell>
                    <TableCell className="header-title-last" align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="body">
                  {loading ? (
                    <TableRow className="body-row">
                      <TableCell sx={{ border: "none" }} colSpan={4}>
                        <LoadingPage />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {dataView?.length === 0 ? (
                        <TableRow className="body-row">
                          <TableCell
                            sx={{ border: "none" }}
                            colSpan={4}
                            align="center"
                          >
                            <EmptyData />
                          </TableCell>
                        </TableRow>
                      ) : (
                        <>
                          {dataView.map((row, index) => (
                            <TableRow className="body-row" key={index}>
                              <TableCell
                                className="body-title-first"
                                component="th"
                                scope="row"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell className="body-title">
                                {row.name}
                              </TableCell>
                              <TableCell className="body-title">
                                {row.description}
                              </TableCell>
                              <TableCell
                                className="body-title-last"
                                align="right"
                              >
                                <PositionAction
                                  row={row}
                                  setRefetch={refetch}
                                  setOpenSuccess={setOpenSuccess}
                                  setOpenError={setOpenError}
                                  setSuccesstMessage={setSuccesstMessage}
                                  setErrorMessage={setErrorMessage}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction="row" justifyContent="right" spacing={1}>
              <IconButton
                disabled={
                  data?.getJobTitlesPagination?.paginator?.prev === null
                    ? true
                    : false
                }
                onClick={() =>
                  setPage(data?.getJobTitlesPagination?.paginator?.prev)
                }
              >
                <ArrowBackIosNewIcon sx={{ ":hover": { color: "#0969A0" } }} />
              </IconButton>

              <Stack direction="column" justifyContent="center">
                <Pagination
                  page={pageShow}
                  hideNextButton={true}
                  hidePrevButton={true}
                  count={data?.getJobTitlesPagination?.paginator?.totalPages}
                  variant="outlined"
                  color="primary"
                  onClick={(event) =>
                    setPage(parseInt(event?.target?.textContent))
                  }
                />
              </Stack>
              <IconButton
                disabled={
                  data?.getJobTitlesPagination?.paginator?.next === null
                    ? true
                    : false
                }
                onClick={() =>
                  setPage(data?.getJobTitlesPagination?.paginator?.next)
                }
              >
                <ArrowForwardIosIcon sx={{ ":hover": { color: "#0969A0" } }} />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </div>

      <CreatePosition
        open={open}
        setRefetch={refetch}
        handleClose={handleClose}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
        title="Create"
      />

      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}
