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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const { isAuth, dispatchAuth } = useAuth();
  const {pathname} = useLocation();
  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut!",
    }).then(async (result)=>{
      if (result.value){
        dispatchAuth({type:'LOGOUT'});
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Logged Out !!`,
          showConfirmButton: false,
          timer: 1500,
        });
        return navigate("/");
      }
    }).catch((err) => {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: `${err?.message || "Something Went Wrong!!"}`,
        showConfirmButton: true,
      });
    });
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
          {!isAuth && <Link to="/login" style={{ textDecoration: "none" }}>
            <li className={pathname.includes("login") ? "selected" : ""}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Login</span>
            </li>
          </Link>}
          {isAuth && <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>}
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
