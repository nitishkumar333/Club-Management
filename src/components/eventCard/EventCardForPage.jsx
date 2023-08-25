// import { useState } from "react";
import "./eventCardForPage.scss";
function EventCardForPage(eventData) {
  const { eventId, eventname, date, imageUrl, description } = eventData;
  const url = `http://localhost:8080/${imageUrl}`;

  return (
    <div key={eventId} className="cards-body">
      <div className="details">
        <img src={url} alt="" />
        <h2>{eventname}</h2>
        <p>{description}</p>
      </div>
      <div className="date">
        <p>{date}</p>
      </div>
    </div>
  );
}

export default EventCardForPage;
