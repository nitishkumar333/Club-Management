import "./List.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Datatable from "../../components/datatable/Datatable.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext.js";
import { RotatingLines } from "react-loader-spinner";
const List = () => {
  const [userRows, setUserRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, token, isAuth } = useAuth();
  useEffect(() => {
    fetch("http://localhost:8080/home/societies", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Failed to Fetch !!");
        }
        return result.json();
      })
      .then((res) => {
        console.log("soceity-->" + res);
        const usersArray = res.societies.map((user) => {
          const temp = user;
          temp.id = temp._id;
          return temp;
        });
        setUserRows(usersArray);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
