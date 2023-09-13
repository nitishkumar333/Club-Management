import "./Single.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleEditForm from "./SingleEditForm.jsx";
import { useAuth } from "../../context/authContext.js";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Single = () => {
  const params = useParams();
  const { token } = useAuth();
  const [data, setData] = useState();
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    fetch(`${BACKEND_URL}/members/${params.memId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
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
    fetch(`${BACKEND_URL}/members/${params.memId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {fetched && (
              <SingleEditForm data={data} handleSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
