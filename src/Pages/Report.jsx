import React, { useRef, useState } from "react";
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
  IconButton,
  Paper,
  Modal,
  TextField,
  InputAdornment,
  TableHead,
  Grid,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useReactToPrint } from "react-to-print";

import "./report.scss";
import { useNavigate } from "react-router-dom";

// Pages
import PayrollReport from "../Component/Report/PayrollReport";
import DailyAttendanceReport from "../Component/Report/DailyAttendanceReport";
import SelectAttendanceReport from "../Component/Report/SelectAttendanceReport";

//Icons
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TuneIcon from "@mui/icons-material/Tune";
import testAvator from "../Assets/testAvator.svg";
import SearchIcon from "@mui/icons-material/Search";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

import LogoReport from "../Assets/logoLogin.svg";

//date packer
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StorageRoom() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //start date
  const [filterDate, setFilterDate] = useState(new Date());
  const [deleteDate, setDeleteDate] = useState(new Date());

  //end date
  const [filterendDate, setFilterendDate] = useState(new Date());
  const [deleteendDate, setDeleteendDate] = useState(new Date());

  //select
  const [reportType, setReportType] = React.useState("dailyattendance");

  //React to print
  const componentRef = useRef();
  const handalePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="report-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Report</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Box className="box-date" sx={{ minWidth: 220 }}>
          <FormControl size="small" fullWidth>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value={"dailyattendance"}>Daily Attendance</MenuItem>
              <MenuItem value={"selectattendance"}>Select Attendance</MenuItem>
              <MenuItem value={"payroll"}>PayRoll</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack direction="row" justifyContent="right" spacing={2}>
          <Box className="box-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={filterDate}
                onChange={(e) => setFilterDate(e)}
                renderInput={(params) => (
                  <TextField
                    type="date"
                    {...params}
                    helperText={null}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Stack sx={{ direction: "column", justifyContent: "center" }}>
            <Typography>To</Typography>
          </Stack>
          <Box className="box-date">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={filterendDate}
                onChange={(e) => setFilterendDate(e)}
                renderInput={(params) => (
                  <TextField
                    type="date"
                    {...params}
                    helperText={null}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Stack>

        <Stack direction="row" spacing={5} className="btn-add">
          <Button
            onClick={handalePrint}
            endIcon={<LocalPrintshopIcon sx={{ color: "#fff" }} />}
          >
            <Typography className="style-add">Print</Typography>
          </Button>
        </Stack>
      </Stack>
      <Box ref={componentRef}>
        {reportType === "dailyattendance" ? <DailyAttendanceReport /> : null}
        {reportType === "payroll" ? <PayrollReport /> : null}
        {reportType === "selectattendance" ? <SelectAttendanceReport /> : null}
      </Box>
    </div>
  );
}
