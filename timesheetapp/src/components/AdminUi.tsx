import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { AppBar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import { RootState } from './ReduxComponents/rootReducer';
import { useState } from "react";
import { Container,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminTimesheet from "./AdminTimesheet";
import AdminLeaveSheet from "./AdminLeaveSheet";
import AdminHistory from "./AdminHistory";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme?: any; open: boolean }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


function AdminUi() {

  const admin = useSelector((state: RootState) => state.admin.admin);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showdata, setshowdata] = useState("Nodata");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
       <AppBar position="fixed" style={{top:"0px"}} >
        <Toolbar className="bg-slate-50">
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "#f97316" }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <div className="w-52 me-2 p-1">
            <img src='https://www.fireflink.com/static/media/fireflink.0d427889.svg' alt="Company Logo"/>
          </div>
          <div className="flex-grow-1">
            <span className=" text-cyan-700 float-end me-4 font-semibold text-lg">
              Welcome
              <span className="text-orange-500">&nbsp;{admin?.name.toUpperCase()}&nbsp; 🙏 &nbsp;</span>
            </span>
          </div>

          <div className="w-8 h-10 flex justify-center align-items-center">
            <button onClick={handleMenu} className="w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#f97316"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </button>
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
              <MenuItem onClick={handleClose}>E-Name :- {admin?.name.toUpperCase()}</MenuItem>
              <MenuItem onClick={handleClose}>E-Id :- {admin?.adminId}</MenuItem>
              <Link to={'/'} >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex",marginTop:"65px" }} >
        <Drawer
          className="mt-12"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["TimeSheet Approval", "LeaveSheet Approval","History"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                   onClick={() => {
                    index === 0 && (setshowdata("TimeSheet"), setOpen(false)),
                      index === 1 &&
                        (setshowdata("LeaveSheet"), setOpen(false)),
                      index === 2 &&
                        (setshowdata("History"), setOpen(false));
                  }}
                >
                  <ListItemIcon>
                  {index ===0 && (
                      <ScheduleIcon style={{ color: "orange" }} />
                    ) }
                    {index ===1 && (
                      <CalendarMonthIcon style={{ color: "orange" }} />
                    ) }
                    {index ===2 && (
                      <WorkHistoryIcon style={{ color: "orange" }} />
                    ) }
                  </ListItemIcon>
                  <ListItemText onClick={()=>{setOpen(false)}} primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Main open={open} className="flex justify-center">
          {showdata === "Nodata" && (
            <div className="w-4/5 h-4/5 absolute m-auto flex align-items-center">
              <Container
                fluid
                className="d-flex absolute justify-content-center align-items-center h-100 w-100"
              >
                <Row className="h-100 w-100 m-auto rounded-xl  ">
                  <Row className="mx-auto  h-100 w-100">
                    <img src="https://media.istockphoto.com/id/1169207942/photo/clock-and-calendar.webp?b=1&s=170667a&w=0&k=20&c=JKICo8grtA00cja4isDWCScUzQfKprFnCmQOs0DhnAI= " height={"90%"} width={"90%"}  alt=""/>
                  </Row>
                </Row>
              </Container>
            </div>
          )}
          {showdata === "TimeSheet" && (
            <div className="w-1/2 absolute m-auto flex ">
            <AdminTimesheet/>
            </div>
          )}
          {showdata === "LeaveSheet" && (
            <div className="w-1/2  absolute m-auto flex align-items-center">
             <AdminLeaveSheet />
            </div>
          )}
           {showdata === "History" && (
            <div className="w-1/2  absolute m-auto flex align-items-center">
             <AdminHistory />
            </div>
          )}
        </Main>
      </Box>
    </div>
  );
}

export default AdminUi;