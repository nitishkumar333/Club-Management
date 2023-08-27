import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Widget from "../../components/widgets/Widget.jsx";
import Chart from "../../components/chart/Chart.jsx";
import Bargraph from "../../components/chart/Bargraph.jsx";
import HomepageEvents from "../../components/events/HomepageEvents.jsx";
import { useEffect, useState, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useTransition, animated } from "@react-spring/web";
const Home = () => {
  let departmentData = new Map([
    ["CORE", 0],
    ["ME", 0],
    ["B.Farma", 0],
    ["AIML", 0],
    ["IOT", 0],
    ["DS", 0],
    ["ECE", 0],
  ]);
  const [eventsData, setEventsData] = useState([]);
  const [barData, setBarData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(false);
  const barDataFetch = () => {
    fetch("http://localhost:8080/home/all/bargraph")
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Something went wrong!!");
        }
        return res.json();
      })
      .then((res) => {
        res.map((soc) => {
          const department = soc.department.includes("CSE ")? soc.department.replace("CSE ", ""):soc.department;
          console.log(soc.department);
          departmentData.set(
            department,
            departmentData.get(department) + 1
          );
          return departmentData;
        });
        let barData = [];
        let index = 0;
        departmentData.forEach((value, key) => {
          barData.push({
            department: key,
            num: value,
            stroke: barColors[index % barColors.length].slice(0, -2),
            fill: barColors[index++ % barColors.length],
          });
        });
        setBarData(barData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const eventsDataFectch = () => {
    fetch(`http://localhost:8080/all/upcomingEvents`)
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Failed to Fetch !!");
        }
        return result.json();
      })
      .then((result) => {
        setEventsData(result.events.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (ref.current === false) {
      barDataFetch();
      eventsDataFectch();
      setIsLoading(false);
      return () => (ref.current = true);
    }
  }, []);

  const widgetTypes = [
    { type: "societies" },
    { type: "members" },
    { type: "events" },
    { type: "user" },
  ];
  const widgetTransition = useTransition(widgetTypes, {
    from: { opacity: 0, scale: 0.7 },
    enter: { opacity: 1, scale: 1 },
    trail: 150,
  });
  return (
    <div className="home">
      <Sidebar />
      {isLoading ? (
        <div className="homeContainer">
          <div className="loader">
            <RotatingLines
              strokeColor="#007bff"
              strokeWidth="4"
              animationDuration="1.3"
              width="80"
              visible={true}
            />
          </div>
        </div>
      ) : (
        <div className="homeContainer">
          <div className="widgets">
            {widgetTransition((style, wid) => (
              <animated.div style={style}>
                <Widget type={wid.type} />
              </animated.div>
            ))}
          </div>
          <div className="charts">
            <Bargraph
              title="Events Organised By Branch"
              aspect={2 / 1}
              barData={barData}
            />
            <Chart title="Events Organised In Month" aspect={2 / 1} />
          </div>
          <HomepageEvents eventsData={eventsData} />
        </div>
      )}
    </div>
  );
};

export default Home;

const barColors = [
  "#2ca02c90",
  "#ff7f0e90",
  "#1f77b490",
  "#ff7f0e90",
  "#1f77b490",
  "#2ca02c90",
  "#cc9d0a90",
];
