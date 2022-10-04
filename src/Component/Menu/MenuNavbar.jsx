import * as React from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import logo from "../../Assets/logo.svg";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import "./menunavbar.scss";
// Icons
import DashPodcastsIcon from "@mui/icons-material/Podcasts";
import EmployeeGroupsIcon from "@mui/icons-material/Groups";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import FactCheckIcon from "@mui/icons-material/FactCheck"; //task
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
// old icon
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  height: "100%",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MenuNavbar({ open, handleDrawerClose }) {
  let location = useLocation();
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent" open={open} className="drawer-menu">
        <DrawerHeader sx={{ mt: 2 }}>
          <Button className="drawerheader">
            <img src={logo} alt="logo" width="80%" />
          </Button>
        </DrawerHeader>

        <List className="list">
          <ListItem
            className={
              location.pathname === "/dashboard"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/dashboard"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <DashPodcastsIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/dashboard"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Dashboard"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem
            className={
              location.pathname === "/employee" ||
              location.pathname === "/employee/employeedetail" ||
              location.pathname === "/employee/updatepersonal" ||
              location.pathname === "/employee/updateemployee"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/employee" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/employee" ||
                    location.pathname === "/employee/employeedetail" ||
                    location.pathname === "/employee/updatepersonal" ||
                    location.pathname === "/employee/updateemployee"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <EmployeeGroupsIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/employee" ||
                    location.pathname === "/employee/employeedetail" ||
                    location.pathname === "/employee/updatepersonal" ||
                    location.pathname === "/employee/updateemployee"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Employee"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem
            className={
              location.pathname === "/attendance"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/attendance" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/attendance" ||
                    location.pathname === "/attendance/purchase"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/attendance"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Attendance"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* Item */}
          {/* <ListItem
            className={
              location.pathname === "/office" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/office" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/office" ||
                    location.pathname === "/office/detailoffice"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <CardTravelIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/office" ||
                    location.pathname === "/office/detailoffice"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Offices"}
                />
              </ListItemButton>
            </Link>
          </ListItem> */}

          {/* Item */}
          <ListItem
            className={
              location.pathname === "/departement" ||
              location.pathname === "/departement/departmentdetail" ||
              location.pathname === "/departement/officedepartment" ||
              location.pathname === "/departement/position"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/departement" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/departement" ||
                    location.pathname === "/departement/officedepartment" ||
                    location.pathname === "/departement/officedepartment" ||
                    location.pathname === "/departement/position"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <AccountTreeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/departement" ||
                    location.pathname === "/departement/officedepartment" ||
                    location.pathname === "/departement/officedepartment" ||
                    location.pathname === "/departement/position"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Departement"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* Item */}
          <ListItem
            className={
              location.pathname === "/shift" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/shift" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/shift"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <WorkHistoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/shift"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Shift"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* Item */}

          <ListItem
            className={
              location.pathname === "/project"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/project" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/project"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <CheckBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/project"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Project"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* item */}

          {/* <ListItem
            className={
              location.pathname === "/task" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/task" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/task"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <FactCheckIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/task"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Task"}
                />
              </ListItemButton>
            </Link>
          </ListItem> */}

          {/* item */}

          <ListItem
            className={
              location.pathname === "/payroll"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/payroll" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/payroll"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <RequestQuoteIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/payroll"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Payroll"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem
            className={
              location.pathname === "/report" ||
              location.pathname === "/resport/dailyattendance"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/resport" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/resport" ||
                    location.pathname === "/resport/dailyattendance"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <NewspaperIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/resport" ||
                    location.pathname === "/resport/dailyattendance"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Report"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem
            className={
              location.pathname === "/user" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/user" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/user"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <AssignmentIndOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/user"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"User"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }}></Box>

        <List className="list">
          <ListItem
            className={
              location.pathname === "/system-setting" ||
              location.pathname === "/system-setting/branch-location" ||
              location.pathname === "/system-setting/public-holiday" ||
              location.pathname === "/system-setting/typeof-timeoff"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link to="/system-setting" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/system-setting" ||
                    location.pathname === "/system-setting/branch-location" ||
                    location.pathname === "/system-setting/public-holiday" ||
                    location.pathname === "/system-setting/typeof-timeoff"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/system-setting" ||
                    location.pathname === "/system-setting/branch-location" ||
                    location.pathname === "/system-setting/public-holiday" ||
                    location.pathname === "/system-setting/typeof-timeoff"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"System Setting"}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
