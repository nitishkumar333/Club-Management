import "./Single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Chart from "../../components/chart/Chart.jsx";
import List from "../../components/table/Table.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleEditForm from "./SingleEditForm.jsx";
import { useAuth } from "../../context/authContext.js";
const Single = () => {
  const params = useParams();
  const { token } = useAuth();
  const [data, setData] = useState();
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/members/${params.memId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        console.log("data==>", data.member);
        setData(data.member);
        setFetched(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    fetch(`http://localhost:8080/members/${params.memId}`, {
      method: "PUT",
      body: formData,
      headers:{
        Authorization: 'Bearer ' + token
      }
    })
      .then((result) => {
        console.log("success!");
        console.log(result);
      })
      .catch((err) => {
        console.log("failed to fetch!");
        console.log(err);
      });
  };

  return (
    <div className="parent">
      <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {fetched && <SingleEditForm data={data} handleSubmit={handleSubmit} />}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Single;
