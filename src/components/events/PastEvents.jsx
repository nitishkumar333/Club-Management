import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState, useEffect } from "react";
import EventCard from "../eventCard/EventCard.jsx";
import EventViewCard from "../eventViewCard/EventViewCard.jsx";
const PastEvents = () => {
  const [viewIsActive, setViewIsActive] = useState(false);
  const [eventData, setEventData] = useState();
  const params = useParams();
  const { token } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/events/pastEvents/${params.societyId}`, {
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
  return (
    <div className="datatable">
      <div className="datatableTitle">Completed Events</div>
      <div className="listContainer">
        <div className="experience" id="experience">
          <div className="experience-body">
            {eventsData.map((event) => (
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
      </div>
      {viewIsActive && (
        <EventViewCard
          data={eventData}
          setViewIsActive={setViewIsActive}
          submitHandler
        />
      )}
    </div>
  );
};

export default PastEvents;
