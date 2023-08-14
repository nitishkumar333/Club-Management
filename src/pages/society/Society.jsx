import '../list/List.scss'
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import MembersTable from "../../components/datatable/MembersTable.jsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState, useEffect } from "react";
import UpcomingEvents from '../../components/events/UpcomingEvents.jsx';
import PastEvents from '../../components/events/PastEvents.jsx';
const Members = () => {
  const params = useParams();
  const { token } = useAuth();
  const [userRows, setUserRows] = useState([]);
  const [societyName, setSocietyName] = useState("");
  useEffect(()=>{
    fetch(`http://localhost:8080/societies/${params.societyId}`,{
      headers:{
        Authorization: 'Bearer ' + token
      }
    })
    .then((result) => {
      if(result.status!==200){
        throw new Error("Failed to Fetch !!");
      }
      return result.json();
    })
    .then((result)=>{
      if(result.status === 500 || result.status === 402) throw new Error("Failed to fetch!");
      const usersArray = result.members.map((user)=>{
        const temp = user;
        temp.id = temp._id;
        return temp;
      })
      setSocietyName(result.societyName);
      setUserRows(usersArray);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <MembersTable userRows={userRows} setUserRows={setUserRows} name={societyName}/>
        <UpcomingEvents/>
        <PastEvents/>
      </div>
    </div>
  );
};

export default Members;
