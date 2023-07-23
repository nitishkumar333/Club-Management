import { useState } from "react";
import "./eventViewCard.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const EventViewCard = ({ data, setViewIsActive, submitHandler }) => {
  console.log("event daat--->" + data);
  const url = `http://localhost:8080/${data.imageUrl}`;
  const [eventData, setEventData] = useState({
    file: data.imageUrl,
    name: data.eventname,
    date: data.date,
    description: data.description,
    department: data.department,
    winners: data.winners,
    type: data.type,
  });
  const [imageChanged, setImageChanged] = useState(false);
  console.log(eventData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitClick = (e) => {
    e.preventDefault();
    submitHandler(eventData);
  };
  return (
    <div className="single">
      <div className="overlay" onClick={() => setViewIsActive(false)}></div>
      <div className="top">
        <form className="profile-form" onSubmit={submitClick}>
          <div className="formDetails">
            <div className={data.type==='UPCOMING'?"detailsBlock-up":"detailsBlock"}>
              <div className="form-group-imageHandler">
                <img
                  src={
                    imageChanged
                      ? URL.createObjectURL(eventData.file)
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
                    setEventData({ ...eventData, file: e.target.files[0] });
                    setImageChanged(true);
                  }}
                  style={{ display: "none" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Event Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            {data.type === "COMPLETED" && (
              <div className="winnersBlock">
                <div className="form-group">
                  <label htmlFor="first">First Position:</label>
                  <input
                    type="text"
                    name="first"
                    value={eventData.winners[0].first}
                    onChange={handleChange}
                  />
                  <label htmlFor="second">Second Position:</label>
                  <input
                    type="text"
                    name="second"
                    value={eventData.winners[0].second}
                    onChange={handleChange}
                  />
                  <label htmlFor="third">Third Position:</label>
                  <input
                    type="text"
                    name="third"
                    value={eventData.winners[0].third}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EventViewCard;
