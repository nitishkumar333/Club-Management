import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Society from "./pages/single/Society.jsx";
import List from "./pages/society/List.jsx";
import New from "./pages/new/New.jsx";
import NewMember from "./pages/new/NewMember.jsx";
import NewEvent from "./components/newEvent/NewEvent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, memberInputs } from "./formSource.js";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import UpcomingEvents from "./pages/events/UpcomingEvents.jsx";
import PastEvents from "./pages/events/PastEvents.jsx";
import EventDetails from "./components/eventCard/EventDetails.jsx";
import { useAuth } from "./context/authContext.js";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { userId, token, isAuth, dispatchAuth } = useAuth();
  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    if (auth === true) {
    } else {
      handleSignInSubmit();
    }
  }, []);
  const handleSignInSubmit = (e) => {
    fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: "aenitishkumar@gmail.com",
        password: "ritik1920",
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        dispatchAuth({
          type: "LOGIN",
          token: resData.token,
          userId: resData.userId,
          isAuth: true,
        });
        localStorage.setItem("isAuth", true);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
      })
      .catch((err) => {});
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="events/:eventID" element={<EventDetails />} />
            <Route path="societies">
              <Route index element={<List />} />
              <Route path=":societyId">
                <Route
                  path="new"
                  element={
                    <NewMember inputs={memberInputs} title="Add New Member" />
                  }
                />
                <Route
                  path="newEvent"
                  element={<NewEvent title="Add New Event" />}
                />
                <Route index element={<Society />} />
              </Route>
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="upcomingEvents" element={<UpcomingEvents />} />
            <Route path="pastEvents" element={<PastEvents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
