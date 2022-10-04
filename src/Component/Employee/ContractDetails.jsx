import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  Typography,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Box } from "@mui/system";
import moment from "moment";
import { useQuery } from "@apollo/client";
//components
import "./employeeinfo.scss";
import EmptyData from "../Include/EmptyData";
import UpdateContract from "./UpdateContract";
import { GET_CONTRACT_BY_EMPLOYEEID } from "../../Schema/Contract";
import ContractAction from "./ContractAction";

export default function ContractDetails({
  viewData,
  setRefetch,
  viewInfoData,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  console.log("viewInfoData:::", viewInfoData);

  return (
    <div className="employee-information">
      <Box sx={{ flexGrow: 1 }} className="main-containner">
        <Grid item container spacing={3}>
          <Grid item xs={6} lg={3}>
            <Box className="profile-container">
              <Stack
                className="profile"
                direction="row"
                justifycontent="center"
              >
                <Avatar
                  src={viewInfoData?.image?.src}
                  className="avater-image"
                />
              </Stack>
              <Typography
                className="profile-name-khmer"
                sx={{ marginTop: "20px" }}
              >
                {viewInfoData?.khmer_name?.last_name +
                  " " +
                  viewInfoData?.khmer_name?.first_name}
              </Typography>
              <Typography className="profile-name">
                {viewInfoData?.latin_name?.last_name +
                  " " +
                  viewInfoData?.latin_name?.first_name}
              </Typography>
              <Divider sx={{ marginTop: "10px" }} />
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <Typography className="title-items">
                    Current Position
                  </Typography>
                  <Typography className="items-name">
                    {viewData?.map((rowData, index) => {
                      if (rowData?.expire_status === false) {
                        return rowData?.job_title?.name;
                      }
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="title-items">Staff ID</Typography>
                  <Typography className="items-name">
                    {viewInfoData?.employee_id}
                  </Typography>
                  <Typography className="title-items">Join date</Typography>
                  <Typography className="items-name">
                    {moment(viewInfoData?.join_date).format("DD-MMM-YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="title-items">Staff type</Typography>
                  <Typography className="items-name">
                    {viewInfoData?.type}
                  </Typography>
                  <Typography className="title-items">Work Book</Typography>
                  <Typography className="items-name">
                    {viewInfoData?.work_book ? "Yes" : "No"}
                  </Typography>
                </Grid>
              </Grid>

              <Typography className="title-items">Shift</Typography>
              <Typography className="items-name">
                {viewData?.map((rowData, index) => {
                  if (rowData?.expire_status === false) {
                    return rowData?.schedule;
                  }
                })}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} lg={9}>
            <Box className="table-container">
              <Typography className="title-table">Contract</Typography>
              <Table className="education-table">
                <TableHead>
                  <TableRow className="table-row">
                    <TableCell className="table-cell" width="5%">
                      N°
                    </TableCell>
                    <TableCell className="table-cell" width="15%">
                      Title
                    </TableCell>
                    <TableCell className="table-cell" width="15%">
                      Job title
                    </TableCell>
                    <TableCell className="table-cell" width="15%">
                      Join Date
                    </TableCell>
                    <TableCell className="table-cell" width="15%">
                      Expire Date
                    </TableCell>
                    <TableCell
                      className="table-cell"
                      width="5%"
                      align="right"
                    ></TableCell>
                  </TableRow>
                </TableHead>

                {viewData?.length !== 0 ? (
                  <>
                    {viewData?.map((data, index) => (
                      <TableBody>
                        <TableRow className="table-row-body">
                          <TableCell className="table-cell" width="5%">
                            {index + 1}
                          </TableCell>
                          <TableCell className="table-cell" width="15%">
                            {data?.title}
                          </TableCell>
                          <TableCell className="table-cell" width="15%">
                            {data?.job_title?.name}
                          </TableCell>
                          <TableCell className="table-cell" width="15%">
                            {moment(data?.start_date).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell className="table-cell" width="15%">
                            {moment(data?.end_date).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell width="5%" align="right">
                            <ContractAction
                              editData={data}
                              setRefetch={setRefetch}
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
                  <TableBody>
                    <TableRow className="table-row">
                      <TableCell
                        className="table-cell"
                        colSpan={4}
                        sx={{ textAlign: "center" }}
                      >
                        <EmptyData />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
