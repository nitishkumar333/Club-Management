import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
const New = ({ inputs, title }) => {
  const params = useParams();
  const [data, setFormData] = useState({});
  const { token } = useAuth();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("societyId", params.societyId);
    fetch("http://localhost:8080/member", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
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
                  name="file"
                  type="file"
                  id="file"
                  onChange={(e) =>
                    setFormData({ ...data, file: e.target.files[0] })
                  }
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => {
                      setFormData({
                        ...data,
                        [input.label.trim().toLowerCase()]: e.target.value,
                      });
                    }}
                  />
                  {/* <input type={input.type} placeholder={input.placeholder} /> */}
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
