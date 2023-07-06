import '../list/List.scss'
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import MembersTable from "../../components/datatable/MembersTable.jsx";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";
import { useState, useEffect } from "react";
const Members = () => {
  const params = useParams();
  const { token } = useAuth();
  const [userRows, setUserRows] = useState([]);
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
    .then((res)=>{
      console.log(res);
      const usersArray = res.members.map((user)=>{
        const temp = user;
        temp.id = temp._id;
        return temp;
      })
      console.log(usersArray);
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
        <MembersTable userRows={userRows} setUserRows={setUserRows} />
      </div>
    </div>
  );
};

export default Members;
