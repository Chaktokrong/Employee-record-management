import { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import "./branchnamelocation.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BRANCH } from "../../Schema/Setting";

// component
import DialogBranchLocation from "./DialogBranchLocation";
import Map from "./Map";
import BranchNameLocationAction from "./BranchNameLocationAction";
// Alert message
import AlertMessage from "../AlertMessage/AlertMessage";

// icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export default function BranchNameLocation() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const { data, refetch } = useQuery(GET_BRANCH, {
    variables: {
      page: 1,
      limit: 100,
      keyword: "",
      pagination: null,
    },
  });

  return (
    <>
      <div className="set-school-location">
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
              / Branch & Location
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
          <Box sx={{ mt: 5, mb: 3 }}>
            <Typography variant="body">
              Information and Location Details of properties.
            </Typography>
          </Box>
          <Grid container spacing={5}>
            {data?.getBranchPagination?.branch?.map((row, index) => (
              <>
                <Grid item xs={12} md={4}>
                  <Stack direction="row" justifyContent="center">
                    <Stack
                      direction="column"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography variant="body" className="title-text">
                        Property Information
                      </Typography>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }} />
                    <BranchNameLocationAction
                      row={row}
                      setRefetch={refetch}
                      handleClose={handleClose}
                      setOpenSuccess={setOpenSuccess}
                      setOpenError={setOpenError}
                      setSuccesstMessage={setSuccesstMessage}
                      setErrorMessage={setErrorMessage}
                    />
                  </Stack>
                  <Divider sx={{ mt: 1, mb: 1 }} />
                  <Typography variant="body" className="text">
                    {row?.branch_name}
                  </Typography>
                  <br />
                  <Typography variant="body">{row?.description}</Typography>
                  <br />
                  <Typography variant="body">
                    {row?.longitude + ", " + row?.latitude}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={8} lg={8}>
                      <Map rows={row} />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </div>

      <DialogBranchLocation
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
