import React, { useState } from "react";
import "./statuscard.scss";
import { Grid, Box, Avatar, Stack, Typography, Button } from "@mui/material";
import moment from "moment/moment";
import ShiftDetails from "./ShiftDetails";

export default function StatusCard({
  rowDatas,
  status,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  // console.log("rowDatas::>>>", rowDatas);
  const [cardData, setCardData] = useState();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open, data) => (event) => {
    setState({ ...state, [anchor]: open });
    setCardData(data);
  };

  return (
    <div className="pending">
      <Grid item container spacing={3}>
        {rowDatas?.map((data, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
              <Button
                onClick={toggleDrawer("right", true, data)}
                className="pending-container"
              >
                <Box className="btn-pending">
                  <Stack direction="column" spacing={2}>
                    <Stack direction="row">
                      <Avatar
                        sx={{ width: 50, height: 50 }}
                        src={data?.created_by?.image?.src}
                      />
                      <Stack direction="column" className="stack-text">
                        <Typography className="name">
                          {data?.created_by?.latin_name?.last_name +
                            " " +
                            data?.created_by?.latin_name?.first_name}
                        </Typography>
                        <Typography className="staff-id">
                          Staffs ID:
                          <span className="id-num">
                            {data?.created_by?.employee_id}
                          </span>
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" className="stack-center">
                      <Box className="front-box" />
                      <Box className="box-items">
                        <Stack
                          direction="column"
                          className="stack-reason"
                          justifyContent="center"
                          height="100%"
                        >
                          <Typography className="reason">
                            Take leave : {data?.type_of_timeoff?.type_name}
                          </Typography>
                          <Typography className="date">
                            {moment(data?.start_date).format("DD-MMM-YYYY")} -{" "}
                            {moment(data?.end_date).format("DD-MMM-YYYY")}
                          </Typography>
                          <Typography
                            className="time"
                            sx={{
                              display:
                                data?.start_time === null &&
                                data?.end_time === null
                                  ? "none"
                                  : "flex",
                            }}
                          >
                            {moment(data?.start_time).format("hh:mm")} -{" "}
                            {moment(data?.end_time).format("hh:mm")}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Box className="box-reason">
                      <Typography className="reason-title">Reason</Typography>
                      <Typography className="reason-text">
                        {data?.reason}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <ShiftDetails
        data={cardData}
        anchor={"right"}
        open={state["right"]}
        toggleDrawer={toggleDrawer}
        setState={setState}
        setRefetch={setRefetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
