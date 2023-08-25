import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect } from "react";
import { useState } from "react";

const Widget = ({ type }) => {
  let data;
  let url;
  const [count, setCount] = useState(0);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      url = "http://localhost:8080/auth/all/users/count";
      break;
    case "societies":
      data = {
        title: "SOCIETIES",
        link: "View all Societies",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      url = "http://localhost:8080/home/all/societies/count";
      break;
    case "members":
      data = {
        title: "MEMBERS",
        link: "View all Members",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      url = "http://localhost:8080/all/members/count";
      break;
    case "events":
      data = {
        title: "EVENTS",
        link: "View all Events",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      url = "http://localhost:8080/all/events/count";
      break;
    default:
      break;
  }

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((count) => {
        setCount(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
