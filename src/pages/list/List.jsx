import "./List.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Datatable from "../../components/datatable/Datatable.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext.js";
const List = () => {
  const [userRows, setUserRows] = useState([]);
  const { userId, token, isAuth } = useAuth();
  useEffect(()=>{
    fetch("http://localhost:8080/home/societies",{
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
      console.log("soceity-->"+res);
      const usersArray = res.societies.map((user)=>{
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
        <Datatable userRows={userRows} setUserRows={setUserRows}/>
      </div>
    </div>
  );
};

export default List;
