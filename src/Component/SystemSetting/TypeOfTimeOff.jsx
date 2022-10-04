import React, { useState } from "react";
import "./typeoftimeoff.scss";
import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DialogTypeOfTimeOff from "./DialogTypeOfTimeOff";
import { useNavigate } from "react-router-dom";
//component
import TypeOfTimeOffAction from "./TypeOfTimeOffAction";
import { GET_TYPE_OF_TIME_OFF } from "../../Schema/Setting";
import { useQuery } from "@apollo/client";
import EmptyData from "../Include/EmptyData";
import LoadingPage from "../Include/LoadingPage";
// Alert message
import AlertMessage from "../AlertMessage/AlertMessage";

export default function TypeOfTimeOff() {
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
  // loading

  const [rowData, setRowData] = useState([]);

  const { data, refetch } = useQuery(GET_TYPE_OF_TIME_OFF, {
    onCompleted: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(true);
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="set-typeof-timeoff">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />

        <Stack direction="column" justifyContent="center">
          <Typography className="color">
            <b
              onClick={() => navigate("/system-setting")}
              style={{ cursor: "pointer" }}
            >
              Setting{" "}
            </b>
            / Type Of Time Off
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="column" className="btn-timeoff">
          <Button
            onClick={handleOpen}
            sx={{ color: "white" }}
            endIcon={<AddCircleOutlineIcon />}
          >
            CREATE
          </Button>
        </Stack>
      </Stack>

      <Box className="container">
        <Box sx={{ mt: 5, mb: 3 }}>
          <Typography variant="body">List of Type Time Off.</Typography>
        </Box>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <LoadingPage />
            </Grid>
          ) : (
            <>
              {data?.getTypeOfTimeOff?.lenght === 0 ? (
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ backgroundColor: "gray" }}
                  >
                    <EmptyData />
                  </Stack>
                </Grid>
              ) : (
                <>
                  {data?.getTypeOfTimeOff?.map((row, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
                      <Box className="card-timeoff">
                        <Stack direction="row">
                          <Typography className="sub-title" mt={1}>
                            N°: 000{index + 1}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />

                          <TypeOfTimeOffAction
                            row={row}
                            setRefetch={refetch}
                            setOpenSuccess={setOpenSuccess}
                            setOpenError={setOpenError}
                            setErrorMessage={setErrorMessage}
                            setSuccesstMessage={setSuccesstMessage}
                          />
                        </Stack>

                        <Divider />

                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Type Name
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography>{row?.type_name}</Typography>
                              </Grid>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Limit
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography>{row?.limit}</Typography>
                              </Grid>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Male Use Able
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography>
                                  {row?.male_use_able} days / a year
                                </Typography>
                              </Grid>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Female Use Able
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography>
                                  {row?.female_use_able} days / a year
                                </Typography>
                              </Grid>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Deduct
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography>{row?.deduct} $</Typography>
                              </Grid>
                            </Stack>
                          </Grid>

                          <Grid item xs={12} sm={12} md={12}>
                            <Stack direction="row" width="100%">
                              <Grid item xs={5}>
                                <Typography className="sub-title">
                                  Deduct Option
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <Typography className="sub-title">:</Typography>
                              </Grid>

                              <Grid item xs={6}>
                                <Typography>{row?.deduct_option} </Typography>
                              </Grid>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Box>
      <DialogTypeOfTimeOff
        open={open}
        handleClose={handleClose}
        setRefetch={refetch}
        title={"Create"}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setErrorMessage={setErrorMessage}
        setSuccesstMessage={setSuccesstMessage}
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
