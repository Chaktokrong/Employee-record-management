import * as React from "react";
import { Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import IconMenuResponsive from "./IconMenuResponsive";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

import { auth } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./topnavbar.scss";

export default function TopNavbar({
  prefersDarkMode,
  setPrefersDarkMode,
  handleDrawerOpen,
  open,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openLogout, setOpenLogout] = React.useState(false);

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        window.localStorage.removeItem("users");
        window.localStorage.removeItem("userLogin");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <>
      <Toolbar
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "background.default" : "#fff",
          borderBottom: theme.palette.mode === "dark" ? "1px solid #fff" : null,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <IconMenuResponsive />
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1} justifyContent="right">
            {/* <IconButton>
              <NotificationsActiveOutlinedIcon
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#0969A0",
                }}
              />
            </IconButton> */}
            <Profile handleOpenLogout={handleOpenLogout} />
          </Stack>
        </Stack>
      </Toolbar>

      <div>
        <Dialog open={openLogout} className="log-out-style">
          <DialogTitle>
            <Stack
              direction="row"
              justifyContent="right"
              sx={{ marginTop: "-5px" }}
            >
              <IconButton onClick={handleCloseLogout}>
                <DoDisturbOnOutlinedIcon
                  sx={{ color: "red", fontSize: "25px" }}
                />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Stack direction="column" justifyContent="center" height="150px">
                <Stack
                  direction="row"
                  justifyContent="center"
                  width="400px"
                  marginTop="-10px"
                >
                  <Typography
                    className={
                      theme.palette.mode === "dark"
                        ? "text-logout-dark"
                        : "text-logout"
                    }
                  >
                    {" "}
                    You are attemping to log out.
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="center" width="400px">
                  <Typography
                    className={
                      theme.palette.mode === "dark"
                        ? "text-logout-litle-dark"
                        : "text-logout-litle"
                    }
                  >
                    {" "}
                    Are you sure?
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="center"
                  width="400px"
                  marginTop="30px"
                >
                  <Button
                    onClick={handleSignOut}
                    autoFocus
                    fullWidth
                    className="btn-log-out-style"
                  >
                    LOG OUT
                  </Button>
                </Stack>
              </Stack>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
