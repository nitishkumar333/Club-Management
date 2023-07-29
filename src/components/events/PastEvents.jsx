import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
      <div className="datatableTitle">Completed Events</div>
      {eventsData.length > 0 ? (
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
                  reportUrl={event.reportUrl}
                  type={event.type}
                  setViewIsActive={setViewIsActive}
                  setEventData={setEventData}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No Completed Events Found.</p>
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

export default PastEvents;
