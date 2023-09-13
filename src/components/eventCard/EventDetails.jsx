import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.jsx";
import { getData } from "../../apiFetch.js";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function EventDetails() {
  const params = useParams();
  const [eventData, setEventData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const formattedDate = new Date(eventData?.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  useEffect(() => {
    getData(`${BACKEND_URL}/events/${params.eventID}`, (event) => {
      setEventData(event);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        {isLoading ? (
          <div className="loader">
            <RotatingLines
              strokeColor="#007bff"
              strokeWidth="4"
              animationDuration="1.3"
              width="80"
              visible={true}
            />
          </div>
        ) : (
          <article id="event-details">
            <header>
              <h1>{eventData.eventname}</h1>
              {eventData?.type === "COMPLETED" && (
                <nav>
                  <a
                    href={`${BACKEND_URL}/${eventData.reportUrl}`}
                    className="button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Report
                  </a>
                </nav>
              )}
            </header>
            <div id="event-details-content">
              <img
                src={`${BACKEND_URL}/${eventData.imageUrl}`}
                alt={eventData.eventname}
              />
              <div id="event-details-info">
                <div>
                  <p>{eventData.department}</p>
                  <p>{formattedDate}</p>
                </div>
                <p className="event-details-description">{eventData.description}</p>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
