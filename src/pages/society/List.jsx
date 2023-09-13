import "./List.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Datatable from "../../components/datatable/Datatable.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext.js";
import { RotatingLines } from "react-loader-spinner";
import { getDataPrivate } from "../../apiFetch.js";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const List = () => {
  const [userRows, setUserRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, token, isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth){
      return navigate("/login");
    }
    getDataPrivate(`${BACKEND_URL}/home/societies`, (res) => {
      const usersArray = res.societies.map((user) => {
        const temp = user;
        temp.id = temp._id;
        return temp;
      });
      setUserRows(usersArray);
      setIsLoading(false);
    }, token);
  }, []);
  
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {isLoading ? (
          <div className="loader">
            <RotatingLines
              strokeColor="#007bff"
              strokeWidth="4"
              animationDuration="1.3"
              width="80"
              visible={true}
            />
          </div>
        ) : (
          <Datatable userRows={userRows} setUserRows={setUserRows} />
        )}
      </div>
    </div>
  );
};

export default List;
