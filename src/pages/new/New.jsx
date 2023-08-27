import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useAuth } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [data, setFormData] = useState({department:'CSE CORE'});
  const { token } = useAuth();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    fetch("http://localhost:8080/home/society", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if(result.status === 500) throw new Error("Failed to fetch!");
        console.log(result);
        return navigate('/societies');
      })
      .catch((err) => {
        console.log("Failed to fetch!");
        console.log(err);
      });
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
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

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={`${input.label.trim().toLowerCase()}`}>{input.label}</label>
                  {input.label === "Department" ? (
                    <select
                      name="department"
                      id="department"
                      onChange={(e) => {
                        setFormData({
                          ...data,
                          [input.label.trim().toLowerCase()]: e.target.value,
                        });
                      }}
                    >
                      <option value="CSE CORE">CSE CORE</option>
                      <option value="CSE AIML">CSE AIML</option>
                      <option value="CSE IOT">CSE IOT</option>
                      <option value="CSE DS">CSE DS</option>
                      <option value="ME">ME</option>
                      <option value="ECE">ECE</option>
                      <option value="B.Farma">B.Farma</option>
                    </select>
                  ) : (
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
                  )}
                </div>
              ))}
              <button type="submit" className="button">Add Club</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
