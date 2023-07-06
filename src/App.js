import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Single from "./pages/single/Single.jsx";
import Members from "./pages/members/Members.jsx";
import List from "./pages/list/List.jsx";
import New from "./pages/new/New.jsx";
import NewMember from "./pages/new/NewMember.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs, memberInputs } from "./formSource.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";

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
                <Route index element={<Members />} />
                <Route
                  path=":memId"
                  element={
                    <Single inputs={memberInputs} title="Add New Member" />
                  }
                />
              </Route>
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
