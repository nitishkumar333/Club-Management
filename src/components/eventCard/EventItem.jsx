import { Link } from 'react-router-dom';
import "./eventItem.scss";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EventItem = (event)=> {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return (
    <article className="event-item">
        <div className='imageDiv'>
            <img src={`${BACKEND_URL}/${event.imageUrl}`} alt={event.eventname} />
        </div>
      <div className="event-item-content">
        <div>
          <h2>{event.eventname}</h2>
          <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.department}</p>
        </div>
        <p>
          <Link to={`/events/${event.eventId}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}

export default EventItem;