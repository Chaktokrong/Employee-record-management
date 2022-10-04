import { useState, useEffect } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import "./publicholidaybymonth.scss";
import PublicHolidayAction from "./PublicHolidayAction";
import DialogHoliday from "./DialogHoliday";
import { GET_PUBLIC_HOLIDAY } from "../../Schema/Setting";
import { useQuery } from "@apollo/client";
// Alert message
import AlertMessage from "../AlertMessage/AlertMessage";
import moment from "moment";

export default function PublicHolidayByMonth({
  monthSeleced,
  MonthofYear,
  setCountDay,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rowData, setRowData] = useState([]);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { data, refetch } = useQuery(GET_PUBLIC_HOLIDAY, {
    onCompleted: ({ getPublicHoliday }) => {
      console.log(getPublicHoliday);
      setRowData(getPublicHoliday);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (data?.getPublicHoliday) {
      setCountDay(data?.getPublicHoliday?.length);
    }
  }, [data?.getPublicHoliday]);

  return (
    <>
      <Box className="public-by-month">
        <Stack direction="row" justifyContent="center" width="100%">
          <Stack direction="row" flexDirection="column" justifyContent="center">
            <Typography className="header-month-text">
              {monthSeleced}
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            className="btn-create"
            onClick={handleOpen}
          >
            Add
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexDirection="column"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {rowData?.map((row, index) =>
            row?.in_month === monthSeleced ? (
              <Stack
                key={index}
                direction="row"
                justifyContent="center"
                className="item-public"
              >
                <Stack
                  direction="row"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ ml: 2 }}
                >
                  <Typography className="title-text">
                    {row?.holiday_name}
                  </Typography>
                  <Typography className="body-text">
                    {moment(row?.holiday_date).format("MMMM Do YYYY")}
                  </Typography>
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                  direction="row"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <PublicHolidayAction
                    row={row}
                    setRefectch={refetch}
                    monthSeleced={monthSeleced}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                    setSuccesstMessage={setSuccesstMessage}
                    setErrorMessage={setErrorMessage}
                  />
                </Stack>
              </Stack>
            ) : null
          )}
        </Stack>
      </Box>

      <DialogHoliday
        open={open}
        title="Create"
        monthSeleced={monthSeleced}
        MonthofYear={MonthofYear}
        setRefectch={refetch}
        handleClose={handleClose}
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
    </>
  );
}
