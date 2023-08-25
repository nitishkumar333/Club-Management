// import { useState, useEffect } from "react";
// import Sidebar from "../../components/sidebar/Sidebar.jsx";
// import Post from "../../components/events/Post.jsx";
// import { RotatingLines } from "react-loader-spinner";
// const UpcomingEvents = () => {
//   const [eventsData, setEventsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     fetch(`http://localhost:8080/all/upcomingEvents`)
//       .then((result) => {
//         if (result.status !== 200) {
//           throw new Error("Failed to Fetch !!");
//         }
//         return result.json();
//       })
//       .then((result) => {
//         setEventsData(result.events);
//         setIsLoading(false);
//         return result;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="list">
//       <Sidebar />
//       <div className="listContainer">
//         <div className="datatable">
//           <div className="datatableTitle" style={{"marginLeft":"20px"}}>Upcoming Events</div>
//           {!isLoading && eventsData.length > 0 && (
//               <div className="experience" id="experience">
//                 <div>
//                   {eventsData.map((event) => (
//                     <Post
//                       key={event._id}
//                       eventId={event._id}
//                       eventname={event.eventname}
//                       description={event.description}
//                       department={event.department}
//                       date={event.date}
//                       imageUrl={event.imageUrl}
//                       type={event.type}
//                     />
//                   ))}
//                 </div>
//               </div>
//           )}
//           {!isLoading && eventsData.length === 0 && (
//             <p style={{ textAlign: "center" }}>No Events Found.</p>
//           )}
//           {isLoading && (
//             <div className="loader">
//               <RotatingLines
//                 strokeColor="#007bff"
//                 strokeWidth="4"
//                 animationDuration="1.3"
//                 width="80"
//                 visible={true}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;
