import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useAuth } from "../../context/authContext.js";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { dispatchAuth } = useAuth();
  const {pathname} = useLocation();
  const logoutHandler = () => {
    dispatchAuth({type:'LOGOUT'});
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">RKGIT</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className={pathname.length===1 ? "selected" : ""}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/societies" style={{ textDecoration: "none" }}>
            <li className={pathname.includes("societies") ? "selected" : ""}>
              <PersonOutlineIcon className="icon" />
              <span>Societies</span>
            </li>
          </Link>
          <Link to="/pastEvents" style={{ textDecoration: "none" }}>
            <li className={pathname.includes("pastEvents") ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Completed Events</span>
            </li>
          </Link>
          <Link to="/upcomingEvents" style={{ textDecoration: "none" }}>
            <li className={pathname.includes("upcomingEvents") ? "selected" : ""}>
              <StoreIcon className="icon" />
              <span>Upcoming Events</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li className={pathname.includes("login") ? "selected" : ""}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Login</span>
            </li>
          </Link>
          <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
