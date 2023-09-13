import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./eventCard.scss";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function EventCard(eventData) {
  const { eventId, eventname, date, imageUrl, setEventData, setViewIsActive, isHomepage, eventDeleteHandler } = eventData;
  const url = `${BACKEND_URL}/${imageUrl}`;

  const viewClickHandler = ()=>{
    setEventData(eventData);
    setViewIsActive(true);
  }

  return (
    <div key={eventId} className={`experience-card`}>
      {!isHomepage && <div className="controls">
        <VisibilityIcon className="view" onClick={viewClickHandler}/>
        <DeleteIcon className="delete" onClick={()=>eventDeleteHandler(eventId)} />
      </div>}
      <div className="experience-details">
        <img src={url} alt="" />
        {/* <h6>{date}</h6> */}
        {/* <h5>{eventname}</h5> */}
      </div>
    </div>
  );
}

export default EventCard;
