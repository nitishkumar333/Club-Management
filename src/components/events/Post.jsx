import "./Post.scss";
const Post = ({
  eventname,
  description,
  date,
  department,
  imageUrl,
  winners,
  type,
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
        {type === "COMPLETED" && winners && (
          <div className="winners">
            <span>First:</span> <p>{winners[0].first}</p>
            <span>Second:</span> <p>{winners[0].second}</p>
            <span>Third:</span> <p>{winners[0].third}</p>
          </div>
        )}
      </div>
      <div className="detail">
        <p>{department}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Post;
