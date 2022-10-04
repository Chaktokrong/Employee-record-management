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
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import "./sectiondetails.scss";
// Copy MUI
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
//icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PreviewIcon from "@mui/icons-material/Preview";
import { GET_EMPLOYEE_BY_SECTIONID } from "../../Schema/Employee";
import SectionAction from "../Section/SectionAction";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function SectionDetails({
  row,
  officeId,
  refectSection,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  setRefetchOffice,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [empbySecId, setEmpbySecId] = useState([]);

  // Open Create Position
  const [openPosition, setOpenPosition] = useState(false);
  const handleOpenPosition = () => setOpenPosition(true);
  const handleClosePosition = () => setOpenPosition(false);
  //
  const [sectionId, setSectionId] = useState();
  const [empBySecData, setEmpBySecData] = useState([]);
  const [openform, setOpenFrom] = React.useState(false);
  const handleOpenform = () => setOpenFrom(true);
  const handleCloseform = () => setOpenFrom(false);

  const handleOpen = (e) => {
    setOpen(!open);
    setSectionId(e);
  };

  const [getEmpBySectionId] = useLazyQuery(GET_EMPLOYEE_BY_SECTIONID, {
    onCompleted: ({ getEmpBySectionId }) => {
      setEmpBySecData(getEmpBySectionId);
      // console.log("getEmpBySectionId::", getEmpBySectionId);
    },
  });

  const handleClick = (e) => {
    handleOpen();
    getEmpBySectionId({
      variables: {
        section_id: e,
      },
    });
  };

  React.useEffect(() => {
    setRefetchOffice();
  }, []);

  return (
    <React.Fragment>
      <TableRow className="tabler-row">
        <TableCell onClick={() => handleClick(row?._id)}>
          {/* <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell component="th" onClick={() => handleClick(row?._id)}>
          {row?.section_name}
        </TableCell>
        <TableCell component="th" onClick={() => handleClick(row?._id)}>
          {row?.section_description}
        </TableCell>
        <TableCell align="right">
          <SectionAction
            editData={row}
            officeId={officeId}
            refectSection={refectSection}
            setRefetchOffice={setRefetchOffice}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
            setSuccesstMessage={setSuccesstMessage}
            setErrorMessage={setErrorMessage}
          />
        </TableCell>
      </TableRow>

      {/* <TableRow className="section-detaisls-page">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" className="table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell className="header-title" width="16%">
                    No
                  </TableCell>
                  <TableCell className="header-title">Job Title</TableCell>
                  <TableCell className="header-title">Description</TableCell>
                  <TableCell className="header-title" width="5%">
                    <IconButton onClick={handleOpenPosition}>
                      <AddCircleIcon className="add-icon-position" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>00012</TableCell>
                  <TableCell>Front End</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}
