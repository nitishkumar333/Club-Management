import { useState } from "react";
import "./Single.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const SingleEditForm = ({ data, handleSubmit }) => {
  const [imageChanged,setImageChanged] = useState(false);
  const [profileData, setProfileData] = useState({
    file: data.imageUrl,
    name: data.name,
    email: data.email,
    phoneno: data.phoneno,
    department: data.department,
    position: data.position,
  });
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
    handleSubmit(profileData);
  };
  return (
    <form className="profile-form" onSubmit={handle}>
      <div className="form-group">
        <img
          src={ imageChanged ? URL.createObjectURL(profileData.file):`http://localhost:8080/${data.imageUrl}`}
          alt="Profile Preview"
          className="profile-image-preview"
        />
      </div>
      <div className="form-group">
        <label htmlFor="file"><DriveFolderUploadOutlinedIcon className="icon" /></label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={(e) =>
            {setProfileData({ ...profileData, file: e.target.files[0] }); setImageChanged(true)}
          }
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
      <div className="form-group">
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={profileData.department}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          name="position"
          value={profileData.position}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SingleEditForm;
