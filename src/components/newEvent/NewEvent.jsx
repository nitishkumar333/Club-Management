import { useState } from "react";
import Sidebar from "../sidebar/Sidebar.jsx";
import Navbar from "../navbar/Navbar.jsx";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";

const NewEvent = ({ title }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setFormData] = useState({
    department: "CSE CORE",
    position: "Faculty",
    type: "UPCOMING",
  });
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [winners, setWinners] = useState({});
  const { token } = useAuth();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("societyId", params.societyId);
    formData.append("winners[first]", winners.first);
    formData.append("winners[second]", winners.second);
    formData.append("winners[third]", winners.third);

    fetch("http://localhost:8080/newEvent", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if (result.status === 422) throw new Error("Failed to fetch!");
        console.log("success!");
        return navigate(-1);
      })
      .catch((err) => {
        console.log("failed to fetch!");
        console.log(err);
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "type") {
      if (e.target.value === "COMPLETED") setIsUpcoming(false);
      else if (e.target.value === "UPCOMING") {
        setIsUpcoming(true);
        setWinners({});
      }
    }
    setFormData({ ...data, [e.target.name.toLowerCase()]: e.target.value });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                data.file
                  ? URL.createObjectURL(data.file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={submitHandler}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  accept="image/*"
                  name="file"
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setFormData({ ...data, file: e.target.files[0] })
                  }
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="eventName">Name Of Event:</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="department">Department:</label>
                <select
                  name="department"
                  id="department"
                  onChange={handleChange}
                >
                  <option value="CSE CORE">CSE CORE</option>
                  <option value="CSE AIML">CSE AIML</option>
                  <option value="CSE IOT">CSE IOT</option>
                  <option value="CSE DS">CSE DS</option>
                  <option value="ME">ME</option>
                  <option value="ECE">ECE</option>
                  <option value="B.Farma">B.Farma</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="type">Type:</label>
                <select name="type" id="type" onChange={handleChange}>
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="date">Date Of Event:</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={handleChange}
                />
              </div>
              {!isUpcoming && (
                <div className="formInput">
                  <label>Report Upload:</label>
                  <input
                    accept="application/pdf"
                    name="report"
                    type="file"
                    id="report"
                    onChange={(e) =>
                      setFormData({ ...data, report: e.target.files[0] })
                    }
                  />
                </div>
              )}
              {!isUpcoming && (
                <div className="formInput">
                  <label htmlFor="winners">Winners:</label>
                  <input
                    type="text"
                    id="winners"
                    name="first"
                    placeholder="First Position"
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    id="winners"
                    name="second"
                    placeholder="Second Position"
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    id="winners"
                    name="third"
                    placeholder="Third Position"
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
