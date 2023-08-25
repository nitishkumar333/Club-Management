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
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import UpcomingEvents from "./pages/events/UpcomingEvents.jsx";
import PastEvents from "./pages/events/PastEvents.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
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
                  element={
                    <NewEvent title="Add New Event" />
                  }
                />
                <Route index element={<Society />} />
              </Route>
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="upcomingEvents" element={<UpcomingEvents />}/>
            <Route path="pastEvents" element={<PastEvents />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
