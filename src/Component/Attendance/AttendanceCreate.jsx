import React, { useState, useEffect } from 'react';
//sass
import './attendancecreate.scss';
//material
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Avatar, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DateRangeIcon from "@mui/icons-material/DateRange";
import Divider from '@mui/material/Divider';
import AttachFileIcon from '@mui/icons-material/AttachFile';
//component
import Departmantimage from "../../Assets/logo.svg";
//npm
import * as XLSX from "xlsx";
import moment from 'moment-timezone'
// Apollo client
import { CREATE_ATTENDANCE } from "../../Schema/Attendance";
import { useMutation } from '@apollo/client';

export default function AttendanceCreate({
    handleClose,
    btnTitle,
    setRefetch,
    setOpenSuccess,
    setOpenError,
    setSuccesstMessage,
    setErrorMessage }) {

    const [createAttendance, { data, loading, error }] = useMutation(CREATE_ATTENDANCE, {
        onCompleted: ({ createAttendance }) => {
            console.log("createAttendance::", createAttendance)
            if (createAttendance?.status === true) {
                setOpenSuccess(true)
                setSuccesstMessage(createAttendance?.message)
                handleClose()
                setRefetch()
            } else {
                setOpenError(true)
                setErrorMessage(createAttendance?.message)
            }
        },
        onError: (error) => {
            // console.log("error::", error)
            setOpenError(true)
            setErrorMessage(error)
        }
    });

    const [value, setValue] = useState(new Date());
    const [permission, setPermission] = useState();
    const [fingerPrintData, setFingerPrintData] = useState();
    const [attendanceFingerPrintData, setAttendanceFingerPrintData] = useState();
    const [microsoftTeamData, setMicrosoftTeamData] = useState();
    const [attendanceMicrosoftTeam, setAttendanceMicrosoftTeam] = useState();
    // console.log("attendanceFingerPrintData::", attendanceFingerPrintData)

    useEffect(() => {
        let rows = [];
        fingerPrintData?.map((e) => {
            // console.log("e::", e)
            let times = e?.late
            let hours = times?.slice(1, 2);
            let minutes = times?.slice(3, 5);
            let hoursNum = parseInt(hours);
            let minutesNum = parseInt(minutes);
            let countTimes = hoursNum * 60 + minutesNum
            // console.log("countTimes::", hoursNum, minutesNum)
            // console.log("countTimes::", countTimes)

            let empId = e?.emp_Id
            const allRow = {
                emp_id: empId.toString(),
                name: e?.Name,
                on_Duty: e?.On_duty,
                off_Duty: e?.Off_duty,
                clock_In: e?.Clock_In,
                clock_Out: e?.Clock_Out,
                date: new Date(e?.date),
                late: e?.late === "" ? 0 : countTimes,
                absent: e?.absent === "TRUE" ? true : false,
            };
            rows.push(allRow);
        });
        setAttendanceFingerPrintData(rows);
    }, [fingerPrintData]);

    useEffect(() => {
        let rows = [];
        microsoftTeamData?.map((e) => {
            // console.log("e?.emp_Id", typeof (e?.emp_Id.toString()))
            const allRow = {
                name: e?.name,
                emp_id: e?.emp_Id.toString(),
                status: e?.stutus.toString(),
                date: new Date(),
            };
            rows.push(allRow);
        });
        setAttendanceMicrosoftTeam(rows);
    }, [microsoftTeamData]);

    const readAttendanceFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setFingerPrintData(json)
                // console.log(json);
                // json.forEach(el => newArray.push(el))
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    const readPermissionFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                // console.log("json::", json);
                setMicrosoftTeamData(json)
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    const onUpload = () => {
        createAttendance({
            variables: {
                fingerprintAtt: attendanceFingerPrintData,
                microsoftTeamAtt: attendanceMicrosoftTeam,
            }
        });
    }

    return (

        <Box className='attendancecreate' >
            <Stack direction="row" spacing={3} m={2}>
                <Box sx={{ flexGrow: 4 }}></Box>
                <Typography className='header-title' variant="h6">UPLOAD ATTENDANCE</Typography>
                <Box sx={{ flexGrow: 1 }}></Box>
                <IconButton onClick={() => handleClose()}> <CloseIcon sx={{ color: "red" }} /></IconButton>
            </Stack>
            <Divider />

            {/* infomation */}
            <Grid item container spacing={1}>
                <Grid item xs={12} className="field-upload">
                    <Typography className="header-body" variant="body1"> Please Attach as Excel file attended </Typography>
                    <TextField
                        size="department name"
                        style={{ display: 'none' }}
                        fullWidth
                        type="file"
                    />
                    <Stack className="main-upload">
                        <Button component="label" className="btn-upload-file" variant="contained" >
                            <AttachFileIcon sx={{ color: "#fff" }} /> Attach file
                            <input onChange={(e) => readAttendanceFile(e)} type="file" hidden />
                        </Button>
                    </Stack>
                </Grid>
                {/* <Grid item xs={12} className="field-upload">

                </Grid> */}
            </Grid>

            <Grid item container spacing={1}>
                <Grid item xs={12} className="field-upload">
                    <Typography className="header-body" variant="body1">Please Attach as Excel file From Microsoft teams</Typography>
                    <TextField
                        size="department name"
                        style={{ display: 'none' }}
                        fullWidth
                        type="file"
                    />

                    <Stack className="main-upload">
                        <Button component="label" className="btn-upload-file" variant="contained" >
                            <AttachFileIcon sx={{ color: "#fff" }} /> Attach file
                            <input type="file" onChange={(e) => readPermissionFile(e)} hidden />
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            <Stack direction="column" className="main-upload-btn" spacing={1} sx={{ mt: 2 }} >
                <Button variant="contained" onClick={onUpload} className="upload-btn">Upload</Button>
            </Stack>

        </Box>
    );
}