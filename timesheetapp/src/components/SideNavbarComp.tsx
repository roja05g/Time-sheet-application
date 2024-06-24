import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import fireflinklogo from "../images/fireflinklogo.png";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideNavbarComp() {
  const { name, id } = useSelector((state: any) => state.userdata);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <nav className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                    <svg
                      className="hidden h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex items-center w-52 h-12 fireflinklogo">
                    <img src={fireflinklogo} alt="Your Company" />
                  </div>
                  <div className="flex space-x-96 fireflinklogo fireflinklogo01">
                    <a
                      href="#"
                      className="text-orange-600  px-3 py-2 text-lg font-medium  fireflinklogo01"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-sky-500 text-lg">
                    Welcome &nbsp;
                    <span className="text-orange-600">
                      {name.toUpperCase()}&nbsp;&nbsp;🙏
                    </span>
                  </h4>
                </div>
                <Toolbar>
                  {auth && (
                    <div>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="primary"
                      >
                        <AccountCircle fontSize="large" />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          <h6>E-Name:{name}</h6>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <h6>E-Id:{id}</h6>
                        </MenuItem>
                        <Link to="/">
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Link>
                      </Menu>
                    </div>
                  )}
                </Toolbar>
              </div>
            </div>
          </nav>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
          }}
        >
          <div className="mt-12 ">
            <Toolbar />
          </div>
          <Box>
            <List>
              {["Time Sheet", "Leave Sheet"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  component={Link}
                  to={index === 0 ? "/timesheet" : "/leavesheet"}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? (
                        <ScheduleIcon style={{ color: "orange" }} />
                      ) : (
                        <CalendarMonthIcon style={{ color: "orange" }} />
                      )}
                    </ListItemIcon>

                    <ListItemText primary={text} className="text-indigo-800" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
