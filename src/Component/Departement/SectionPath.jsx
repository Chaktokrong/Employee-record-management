import { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useQuery } from "@apollo/client";
import { GET_SECTION_IN_OFFICE } from "../../Schema/Section";

// component
import SectionDetails from "./SectionDetails";
import CreateSection from "../Section/CreateSection";
import EmptyData from "../Include/EmptyData";

export default function SectionPath({
  officeId,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
  setRefetchOffice,
}) {
  //
  const [openSection, setOpenSection] = useState(false);
  const handleClosesection = () => {
    setOpenSection(false);
  };

  //
  const [dataSection, setDataSection] = useState([]);
  const { refetch } = useQuery(GET_SECTION_IN_OFFICE, {
    variables: {
      inOffice: officeId,
    },
    onCompleted: ({ getSectionInOffice }) => {
      setDataSection(getSectionInOffice);
      //   console.log("getSectionInOffice::", getSectionInOffice);
    },
  });

  console.log(officeId);
  useEffect(() => {
    refetch();
  }, [officeId]);

  return (
    <>
      <TableContainer component={Paper} className="tb-container">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className="tb-row">
              <TableCell></TableCell>
              <TableCell className="header-title" align="left">
                Section name
              </TableCell>
              <TableCell className="header-title" align="left">
                Description
              </TableCell>
              <TableCell className="header-title" align="right">
                <IconButton
                  disabled={officeId === "" ? true : false}
                  onClick={() => setOpenSection(true)}
                >
                  <AddCircleIcon sx={{ color: "#fff" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSection?.length !== 0 ? (
              <>
                {dataSection?.map((row, index) => (
                  <SectionDetails
                    setRefetchOffice={setRefetchOffice}
                    row={row}
                    officeId={officeId}
                    refectSection={refetch}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                    setSuccesstMessage={setSuccesstMessage}
                    setErrorMessage={setErrorMessage}
                  />
                ))}
              </>
            ) : (
              <TableRow className="tabler-row">
                <TableCell align="center" colSpan={4}>
                  <EmptyData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateSection
        officeId={officeId}
        openSection={openSection}
        handleClose={handleClosesection}
        setRefetch={refetch}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
