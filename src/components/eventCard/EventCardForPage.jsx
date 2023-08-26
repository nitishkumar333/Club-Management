import "./eventCardForPage.scss";
function EventCardForPage(eventData) {
  const {
    eventId,
    eventname,
    date,
    imageUrl,
    description,
    winners,
    isPastEvent,
  } = eventData;
  const url = `http://localhost:8080/${imageUrl}`;

  return (
    <div key={eventId} className="cards-body">
      <div className="details">
        <img src={url} alt="" />
        <h2>{eventname}</h2>
        <p>{description}</p>
      </div>
      {isPastEvent && winners ? (
        <div className="extraDetails">
          <div className="winners">
            <span>First:</span> <p>{winners[0].first}</p>
            <span>Second:</span> <p>{winners[0].second}</p>
            <span>Third:</span> <p>{winners[0].third}</p>
          </div>
          <p>{date}</p>
        </div>
      ) : (
        <div className="date">
          <p>{date}</p>
        </div>
      )}
    </div>
  );
}

export default EventCardForPage;
