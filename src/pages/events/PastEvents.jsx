import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useTransition, animated } from "@react-spring/web";
import { RotatingLines } from "react-loader-spinner";
// import EventCardForPage from "../../components/eventCard/EventCardForPage.jsx";
import EventItem from "../../components/eventCard/EventItem.jsx";
import { getData } from "../../apiFetch.js";
const PastEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const transition = useTransition(eventsData, {
    from: { opacity: 0, scale: 0.7 },
    enter: { opacity: 1, scale: 1 },
    trail: 150,
  });
  useEffect(() => {
    getData("http://localhost:8080/all/pastEvents", (result) => {
      setEventsData(result.events);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <div className="datatable">
          <div className="datatableTitle" style={{ paddingLeft: "42px" }}>
            Completed Events
          </div>
          {eventsData.length > 0 && (
            <div className="experience" id="experience">
              {/* <div
                className="experience-body"
                style={{ gridAutoRows: "15rem" }}
              > */}
              <ul className="events-list">
                {transition((style, event) => (
                  <animated.div style={style}>
                    <EventItem
                      key={event._id}
                      eventId={event._id}
                      eventname={event.eventname}
                      description={event.description}
                      department={event.department}
                      date={event.date}
                      imageUrl={event.imageUrl}
                      winners={event.winners}
                      isPastEvent
                    />
                  </animated.div>
                ))}

              </ul>
              {/* </div> */}
            </div>
          )}
        </div>
        {!isLoading && eventsData.length === 0 && (
          <p style={{ textAlign: "center" }}>No Events Found.</p>
        )}
        {isLoading && (
          <div className="loader">
            <RotatingLines
              strokeColor="#007bff"
              strokeWidth="4"
              animationDuration="1.3"
              width="80"
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PastEvents;
