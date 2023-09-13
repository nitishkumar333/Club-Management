import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MembersTable from "../../components/datatable/MembersTable.jsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState, useEffect } from "react";
import UpcomingEvents from "../../components/events/UpcomingEvents.jsx";
import PastEvents from "../../components/events/PastEvents.jsx";
import { RotatingLines } from "react-loader-spinner";
import { getDataPrivate } from "../../apiFetch.js";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Members = () => {
  const params = useParams();
  const { token } = useAuth();
  const [userRows, setUserRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [societyName, setSocietyName] = useState("");
  useEffect(() => {
    getDataPrivate(`${BACKEND_URL}/societies/${params.societyId}`, (result) => {
      const usersArray = result.members.map((user) => {
        const temp = user;
        temp.id = temp._id;
        return temp;
      });
      setSocietyName(result.societyName);
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
          <>
            <MembersTable
              userRows={userRows}
              setUserRows={setUserRows}
              name={societyName}
            />
            <UpcomingEvents />
            <PastEvents />
            <div className="bottomSpace"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Members;
