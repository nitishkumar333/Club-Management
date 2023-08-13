import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Post from "./Post.jsx";
import "./Post.scss";
const AllEventsPosts = () => {
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/all/upcomingEvents`)
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
          <div className="datatableTitle" style={{"marginLeft":"20px"}}>Upcoming Events</div>
          {eventsData.length > 0 ? (
            <div className="listContainer">
              <div className="experience" id="experience">
                <div>
                  {eventsData.map((event) => (
                    <Post
                      key={event._id}
                      eventId={event._id}
                      eventname={event.eventname}
                      description={event.description}
                      department={event.department}
                      date={event.date}
                      imageUrl={event.imageUrl}
                      type={event.type}
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

export default AllEventsPosts;
