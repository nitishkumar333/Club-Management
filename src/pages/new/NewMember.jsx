import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
const New = ({ inputs, title }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setFormData] = useState({
    department: "CSE CORE",
    position: "Faculty",
  });
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
        if(result.status !== 201) throw new Error("Failed to fetch!");
        console.log("success!");
        return navigate(-1);
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
                  <label>{input.label}</label>
                  {input.label === "Department" ||
                  input.label === "Position" ? (
                    <select
                      name={input.label.toLowerCase().trim()}
                      id={input.label.toLowerCase().trim()}
                      onChange={(e) => {
                        setFormData({
                          ...data,
                          [input.label.trim().toLowerCase()]: e.target.value,
                        });
                      }}
                    >
                      {input.label === "Department" ? (
                        <>
                          <option value="CSE CORE">CSE CORE</option>
                          <option value="CSE AIML">CSE AIML</option>
                          <option value="CSE IOT">CSE IOT</option>
                          <option value="CSE DS">CSE DS</option>
                          <option value="ME">ME</option>
                          <option value="ECE">ECE</option>
                          <option value="B.Farma">B.Farma</option>
                        </>
                      ) : (
                        <>
                          <option value="Faculty">Faculty</option>
                          <option value="President">President</option>
                          <option value="Vice President">Vice President</option>
                          <option value="Technical Head">Technical Head</option>
                          <option value="Technical Member">
                            Technical Member
                          </option>
                          <option value="Core Member">Core Member</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <input
                      type={input.type}
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
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
