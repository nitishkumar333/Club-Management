import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState, useEffect } from "react";
import EventCard from "../eventCard/EventCard.jsx";
import EventViewCard from "../eventViewCard/EventViewCard.jsx";
import { useNavigate } from "react-router-dom";
const UpcomingEvents = () => {
  const [viewIsActive, setViewIsActive] = useState(false);
  const [eventData, setEventData] = useState();
  const params = useParams();
  const { token } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/events/upcomingEvents/${params.societyId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Failed to Fetch !!");
        }
        return result.json();
      })
      .then((result) => {
        setEventsData(result.events);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (data, winners) => {
    console.log("submit data --> ", data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("winners[first]", winners.first);
    formData.append("winners[second]", winners.second);
    formData.append("winners[third]", winners.third);
    fetch(`http://localhost:8080/events/${eventData.eventId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        if (result.status === 500 || result.status === 402)
          throw new Error("Failed to fetch!");
        console.log("success!");
        console.log(result);
        return navigate(0);
      })
      .catch((err) => {
        console.log("failed to fetch!");
        console.log(err);
      });
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Upcoming Events
        <Link to="newEvent" style={{ textDecoration: "none" }} className="link">
          Add New Event
        </Link>
      </div>
      {eventsData.length > 0 ? (
          <div className="experience" id="experience">
            <div className="experience-body" style={{"gridTemplateColumns":"1fr 1fr 1fr"}}>
              {eventsData.map((event, index) => (
                <EventCard
                  key={event._id}
                  eventId={event._id}
                  societyId={params.societyId}
                  eventname={event.eventname}
                  description={event.description}
                  department={event.department}
                  date={event.date}
                  winners={event.winners}
                  imageUrl={event.imageUrl}
                  type={event.type}
                  setViewIsActive={setViewIsActive}
                  setEventData={setEventData}
                />
              ))}
            </div>
          </div>
      ) : (
        <p style={{"textAlign":"center"}}>No Upcoming Events Found.</p>
      )}
      {viewIsActive && (
        <EventViewCard
          data={eventData}
          setViewIsActive={setViewIsActive}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default UpcomingEvents;
