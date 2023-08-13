const Post = ({
  eventId,
  eventname,
  description,
  date,
  department,
  imageUrl,
}) => {
  const image = "http://localhost:8080/" + imageUrl;
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="Card" />
      </div>
      <div className="card-content">
        <div>
          <h2>{eventname}</h2>
          <p className="description">{description}</p>
        </div>
        <div>
          <p className="date">{department}</p>
          <p className="date">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
