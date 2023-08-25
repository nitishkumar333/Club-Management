import EventCard from "../eventCard/EventCard.jsx";
import { useTransition,animated } from '@react-spring/web';
const HomepageEvents = ({eventsData}) => {
  const transition = useTransition(eventsData,{
    from: { opacity: 0, scale:0.7 },
    enter: { opacity: 1, scale:1 },
    trail: 150,
  }); 
  return (
    <div className="datatable">
      <div className="datatableTitle">Upcoming Events</div>
      {eventsData.length > 0 ? (
        <div className="listContainer">
          <div className="experience" id="experience">
            <div className="experience-body" style={{"gridTemplateColumns":"1fr 1fr 1fr"}}>
              {
                transition((style, event)=>(
                  <animated.div style={style}>
                    <EventCard
                      key={event._id}
                      eventId={event._id}
                      eventname={event.eventname}
                      description={event.description}
                      department={event.department}
                      date={event.date}
                      imageUrl={event.imageUrl}
                      isHomepage
                    />
                  </animated.div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No Upcoming Events Found.</p>
      )}
    </div>
  );
};

export default HomepageEvents;
