import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./eventCard.scss";
import { useAuth } from "../../context/authContext.js";
import { useNavigate } from "react-router-dom";
function EventCard(eventData) {
  const { eventId, societyId, eventname, date, imageUrl, setEventData, setViewIsActive } = eventData;
  const url = `http://localhost:8080/${imageUrl}`;
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("delete click" + eventData.eventId);
    fetch(`http://localhost:8080/events/${societyId}/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewClickHandler = ()=>{
    setEventData(eventData);
    setViewIsActive(true);
  }

  return (
    <div key={eventId} className={`experience-card`}>
      <div className="controls">
        <VisibilityIcon className="view" onClick={viewClickHandler}/>
        <DeleteIcon className="delete" onClick={handleDelete} />
      </div>
      <div className="experience-details">
        <img src={url} alt="" />
        <h6>{date}</h6>
        <h5>{eventname}</h5>
      </div>
    </div>
  );
}

export default EventCard;
