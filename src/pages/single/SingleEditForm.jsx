import { useState } from "react";
import "./singleEditForm.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const SingleEditForm = ({ data, setViewIsActive, submitHandler }) => {
  console.log("datatdatd" + data);
  const [profileData, setProfileData] = useState({
    file: data.imageUrl,
    name: data.name,
    email: data.email,
    phoneno: data.phoneno,
    department: data.department,
    position: data.position,
  });
  const [imageChanged, setImageChanged] = useState(false);
  console.log(profileData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handle = (e) => {
    e.preventDefault();
    submitHandler(profileData);
  };
  return (
    <div className="single">
      <div className="overlay" onClick={() => setViewIsActive(false)}></div>
      <div className="top">
        <form className="profile-form" onSubmit={handle}>
          <div className="form-group-imageHandler">
            <img
              src={
                imageChanged
                  ? URL.createObjectURL(profileData.file)
                  : `http://localhost:8080/${data.imageUrl}`
              }
              alt="Profile Preview"
              className="profile-image-preview"
            />
            <label htmlFor="file">
              <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={(e) => {
                setProfileData({ ...profileData, file: e.target.files[0] });
                setImageChanged(true);
              }}
              style={{ display: "none" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneno">Phone Number:</label>
            <input
              type="text"
              id="phoneno"
              name="phoneno"
              value={profileData.phoneno}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-selectHandler">
            <div className="form-group"  style={{"marginRight" : "10px"}}>
              <label htmlFor="department">Department:</label>
              <select
                name="department"
                id="department"
                value={profileData.department}
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
            <div className="form-group"  style={{"marginLeft" : "10px"}}>
              <label htmlFor="position">Position:</label>
              <select
                name="position"
                id="position"
                value={profileData.position}
                onChange={handleChange}
              >
                <option value="Faculty">Faculty</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Technical Head">Technical Head</option>
                <option value="Technical Member">Technical Member</option>
                <option value="Core Member">Core Member</option>
              </select>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleEditForm;
