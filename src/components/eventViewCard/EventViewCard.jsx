import { useState } from "react";
import "./eventViewCard.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const EventViewCard = ({ data, setViewIsActive, submitHandler }) => {
  const reportUrl = `${BACKEND_URL}/${data.reportUrl}`;
  const [eventData, setEventData] = useState({
    file: data.imageUrl,
    report: data.reportUrl,
    eventname: data.eventname,
    date: data.date,
    description: data.description,
    department: data.department,
    type: data.type,
  });
  const [winners, setWinners] = useState({
    first: data.winners[0].first,
    second: data.winners[0].second,
    third: data.winners[0].third,
  });
  const [isUpcoming, setIsUpcoming] = useState(
    eventData.type === "COMPLETED" ? false : true
  );
  const [imageChanged, setImageChanged] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "type") {
      if (e.target.value === "COMPLETED") setIsUpcoming(false);
      else if (e.target.value === "UPCOMING") {
        setIsUpcoming(true);
      }
    }
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitClick = (e) => {
    e.preventDefault();
    submitHandler(eventData, winners);
  };
  return (
    <div className="single">
      <div className="overlay" onClick={() => setViewIsActive(false)}></div>
      <div className="top" style={{"width": "max-content"}}>
        <form className="profile-form" onSubmit={submitClick}>
          <div className="formDetails">
            <div className={isUpcoming ? "detailsBlock-up" : "detailsBlock"}>
              <div className="form-group-imageHandler">
                <img
                  src={
                    imageChanged
                      ? URL.createObjectURL(eventData.file)
                      : `${BACKEND_URL}/${data.imageUrl}`
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
                <label htmlFor="eventname">Event Name:</label>
                <input
                  type="text"
                  id="name"
                  name="eventname"
                  value={eventData.eventname}
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
              {isUpcoming && (
                <div className="formInput">
                  <label htmlFor="type">Type:</label>
                  <select
                    name="type"
                    id="type"
                    onChange={handleChange}
                    value={eventData.type}
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              )}
            </div>
            {!isUpcoming && (
              <div className="winnersBlock">
                <div className="form-group">
                  <label htmlFor="first">First Position:</label>
                  <input
                    type="text"
                    name="first"
                    value={winners.first}
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="second">Second Position:</label>
                  <input
                    type="text"
                    name="second"
                    value={winners.second}
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="third">Third Position:</label>
                  <input
                    type="text"
                    name="third"
                    value={winners.third}
                    onChange={(e) =>
                      setWinners({
                        ...winners,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  {data.type === "COMPLETED" ? (
                    <a href={reportUrl} target="_blank">
                      <button id="report" name="report" type="button">
                        View Report
                      </button>
                    </a>
                  ) : (
                    <div className="formInput">
                      <label>Report Upload:</label>
                      <input
                        accept="application/pdf"
                        name="report"
                        type="file"
                        id="report"
                        onChange={(e) => {
                          setEventData({
                            ...eventData,
                            report: e.target.files[0],
                          });
                        }}
                      />
                    </div>
                  )}
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
