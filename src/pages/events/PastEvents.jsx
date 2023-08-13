import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Post from "../../components/events/Post.jsx";
const PastEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/all/pastEvents`)
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Failed to Fetch !!");
        }
        return result.json();
      })
      .then((result) => {
        console.log(result);
        setEventsData(result.events);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle" style={{"marginLeft":"20px"}}>Past Events</div>
          {eventsData.length > 0 ? (
            <div className="listContainer">
              <div className="experience" id="experience">
                <div>
                  {eventsData.map((event) => (
                    <Post
                      key={event._id}
                      eventname={event.eventname}
                      description={event.description}
                      department={event.department}
                      date={event.date}
                      imageUrl={event.imageUrl}
                      type={event.type}
                      winners={event.winners}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No Events Found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
