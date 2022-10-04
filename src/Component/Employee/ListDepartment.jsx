import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Grid,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import "./liststyle.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useLazyQuery } from "@apollo/client";
import FlipMove from "react-flip-move";
import { GET_QUERY_DEPARTMENT } from "../../Schema/Departement";
import { GET_OFFICE_IN_OFFAIR } from "../../Schema/office";
import { GET_SECTION_IN_OFFICE } from "../../Schema/Section";

export default function ListDepartment(props) {
  const [departmentVal, setDepartmentVal] = useState([]);
  const [officeVal, setOfficeVal] = useState([]);
  const [sectionVal, setSectionVal] = useState([]);

  const [touchedDepartment, setTouchedDepartment] = useState(false);
  const handleTouchDepartment = () => setTouchedDepartment(true);

  const [touchedOffice, setTouchedOffice] = useState(false);
  const handleTouchOffice = () => setTouchedOffice(true);

  const [touchedSection, setTouchedSection] = useState(false);
  const handleTouchSection = () => setTouchedSection(true);

  // Handle Message Error TextField
  const [errorMessage, setErrorMessage] = useState([
    "Department is required!",
    "Office is required!",
    "Section is required!",
  ]);

  const [page, Setpage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);
  const { data, refetch } = useQuery(GET_QUERY_DEPARTMENT, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getAffair }) => {
      // console.log("getAffair::: ", getAffair);
    },
  });

  useEffect(() => {
    if (data?.getAffair) {
      let rows = [];
      data?.getAffair?.map((e, index) => {
        const allRow = {
          id: e?._id,
          label: e?.name,
        };
        rows.push(allRow);
      });
      setDepartmentVal(rows);
    }
  }, [data?.getAffair?.data]);

  const [getOfficeInAffair, { data: officeData, error }] = useLazyQuery(
    GET_OFFICE_IN_OFFAIR,
    {
      onCompleted: ({ getOfficeInAffair }) => {
        // console.log("getOfficeInAffair::: ", getOfficeInAffair);
      },
    }
  );

  useEffect(() => {
    if (officeData?.getOfficeInAffair) {
      let rows = [];
      officeData?.getOfficeInAffair?.map((e, index) => {
        const allRow = {
          id: e?._id,
          label: e?.name,
        };
        rows.push(allRow);
      });
      setOfficeVal(rows);
    }
  }, [officeData?.getOfficeInAffair]);

  const [getSectionInOffice, { data: sectionData }] = useLazyQuery(
    GET_SECTION_IN_OFFICE,
    {
      onCompleted: ({ getSectionInOffice }) => {
        // console.log("getSectionInOffice::: ", getSectionInOffice);
      },
    }
  );

  useEffect(() => {
    if (sectionData?.getSectionInOffice) {
      let rows = [];
      sectionData?.getSectionInOffice?.map((e, index) => {
        const allRow = {
          id: e?._id,
          label: e?.name,
        };
        rows.push(allRow);
      });
      setSectionVal(rows);
    }
  }, [sectionData?.getSectionInOffice]);

  const items = props.items;
  const listItems = items.map((item) => {
    // console.log("item::>>>", item?.affair_id);
    return (
      <Box key={item.key} className="container-departement">
        <Grid item container spacing={2}>
          <Grid item xs={10.5}>
            <Grid item container spacing={1}>
              <Grid item xs={4}>
                <Typography className="list-title-field">
                  Department:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  className="input-flied"
                  disablePortal
                  id="combo-box-demo"
                  options={departmentVal}
                  value={{ id: item?.affair_id, label: item?.affair_name }}
                  onChange={(e, value) => {
                    props?.setUpdateAffairDepartment(
                      value?.id,
                      value?.label,
                      item?.key
                    );
                    getOfficeInAffair({
                      variables: {
                        affairId: value?.id,
                      },
                    });
                  }}
                  getOptionSelected={(option, value) =>
                    option?.id === value?.id
                  }
                  getOptionLabel={(option) =>
                    option?.label ? option?.label : "select department"
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="select department"
                      onFocus={handleTouchDepartment}
                      error={
                        (touchedDepartment &&
                          item?.affair_id === "your department") ||
                        (touchedDepartment && item?.affair_id === undefined) ||
                        (props.checkFieldRequired &&
                          item?.affair_id === "your department") ||
                        (props.checkFieldRequired &&
                          item?.affair_id === undefined)
                      }
                      helperText={
                        (touchedDepartment &&
                          item?.affair_id === "your department" &&
                          errorMessage[0]) ||
                        (props.checkFieldRequired &&
                          item?.affair_id === "your department" &&
                          errorMessage[0]) ||
                        (props.checkFieldRequired &&
                          item?.affair_id === undefined &&
                          errorMessage[0]) ||
                        (touchedDepartment &&
                          item?.affair_id === undefined &&
                          errorMessage[0])
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">Office:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  className="input-flied"
                  disablePortal
                  id="combo-box-demo"
                  options={officeVal}
                  value={{ id: item?.office_id, label: item?.office_name }}
                  onChange={(e, value) => {
                    props?.setUpdateOfficeDepartment(
                      value?.id,
                      value?.label,
                      item?.key
                    );
                    getSectionInOffice({
                      variables: {
                        officeId: value?.id,
                      },
                    });
                  }}
                  getOptionSelected={(option, value) =>
                    option?.id === value?.id
                  }
                  getOptionLabel={(option) =>
                    option?.label ? option?.label : "select office"
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="select office"
                      onFocus={handleTouchOffice}
                      error={
                        (touchedOffice && item?.office_id === "your office") ||
                        (touchedOffice && item?.office_id === undefined) ||
                        (props.checkFieldRequired &&
                          item?.office_id === "your office") ||
                        (props.checkFieldRequired &&
                          item?.office_id === undefined)
                      }
                      helperText={
                        (touchedOffice &&
                          item?.office_id === "your office" &&
                          errorMessage[1]) ||
                        (props.checkFieldRequired &&
                          item?.office_id === "your office" &&
                          errorMessage[1]) ||
                        (props.checkFieldRequired &&
                          item?.office_id === undefined &&
                          errorMessage[1]) ||
                        (touchedOffice &&
                          item?.office_id === undefined &&
                          errorMessage[1])
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography className="list-title-field">Section:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  className="input-flied"
                  disablePortal
                  id="combo-box-demo"
                  options={sectionVal}
                  value={{ id: item?.section_id, label: item?.section_name }}
                  onChange={(e, value) => {
                    props?.setUpdateSectionDepartment(
                      value?.id,
                      value?.label,
                      item?.key
                    );
                  }}
                  getOptionSelected={(option, value) =>
                    option?.id === value?.id
                  }
                  getOptionLabel={(option) =>
                    option?.label ? option?.label : "select section"
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="select section"
                      onFocus={handleTouchSection}
                      error={
                        (touchedSection &&
                          item?.section_id === "your section") ||
                        (touchedSection && item?.section_id === undefined) ||
                        (props.checkFieldRequired &&
                          item?.section_id === "your section") ||
                        (props.checkFieldRequired &&
                          item?.section_id === undefined)
                      }
                      helperText={
                        (touchedSection &&
                          item?.section_id === "your section" &&
                          errorMessage[2]) ||
                        (props.checkFieldRequired &&
                          item?.section_id === "your section" &&
                          errorMessage[2]) ||
                        (props.checkFieldRequired &&
                          item?.section_id === undefined &&
                          errorMessage[2]) ||
                        (touchedSection &&
                          item?.section_id === undefined &&
                          errorMessage[2])
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1.5}>
            <IconButton
              className="btn-icon-department"
              onClick={() => {
                props?.deleteDepartment(item?.key);
              }}
            >
              <DeleteIcon className="icon" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );
  });
  return (
    <FlipMove duration={300} easing="ease-in-out">
      {listItems}
    </FlipMove>
  );
}
