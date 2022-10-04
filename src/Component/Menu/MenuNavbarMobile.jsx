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
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../Assets/logo.svg";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import "./menunavbar.scss";
// Icons
import DashPodcastsIcon from "@mui/icons-material/Podcasts";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import EmployeeGroupsIcon from "@mui/icons-material/Groups";
import MediationIcon from "@mui/icons-material/Mediation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import FactCheckIcon from "@mui/icons-material/FactCheck"; //task
// old icon
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

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
      <Drawer variant="permanent" open={true} className="drawer-menu">
        <DrawerHeader sx={{ mt: 2, mb: 2 }}>
          <Button className="drawerheader">
            <img src={logo} alt="logo" width="80%" />
          </Button>
        </DrawerHeader>

        <List className="list">
          {/* Item */}
          <ListItem
            className={
              location.pathname === "/dashboard"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
            <Link
              to="/employee"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
              location.pathname === "/storage-room"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/attendance"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
                    location.pathname === "/attendance" ||
                    location.pathname === "/attendance/purchase"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Attendance"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            className={
              location.pathname === "/office" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/office"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
          </ListItem>

          <ListItem
            className={
              location.pathname === "/departement" ||
              location.pathname === "/departement/departmentdetail" ||
              location.pathname === "/departement/position"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/departement"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
                  <MediationIcon />
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

          <ListItem
            className={
              location.pathname === "/shift" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/shift"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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

          <ListItem
            className={
              location.pathname === "/calendar"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/calendar"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
              <ListItemButton className="list-item-button" sx={{ px: 2.5 }}>
                <ListItemIcon
                  className={
                    location.pathname === "/calendar"
                      ? "list-item-icon-active"
                      : "list-item-icon"
                  }
                >
                  <InsertInvitationIcon />
                </ListItemIcon>
                <ListItemText
                  className={
                    location.pathname === "/calendar"
                      ? "list-item-text-active"
                      : "list-item-text"
                  }
                  primary={"Calendar"}
                />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
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
          </ListItem>

          <ListItem
            className={
              location.pathname === "/payroll"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/payroll"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
          {/* Item */}

          {/* Item */}
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
            <Link
              to="/resport"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
          {/* Item */}

          {/* Item */}
          <ListItem
            className={
              location.pathname === "/user" ? "list-item-active" : "list-item"
            }
            disablePadding
            sx={{ display: "block" }}
          >
            <Link
              to="/user"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
          {/* Item */}
        </List>

        <Box sx={{ flexGrow: 1 }}></Box>

        <List className="list">
          {/* Item */}
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
            <Link
              to="/system-setting"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerClose}
            >
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
          {/* Item */}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </>
  );
}
