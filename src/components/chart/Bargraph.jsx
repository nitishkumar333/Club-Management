import "./chart.scss";
import { useEffect, useState, useRef } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
const barColors = [
  "#2ca02c90",
  "#ff7f0e90",
  "#1f77b490",
  "#ff7f0e90",
  "#1f77b490",
  "#2ca02c90",
  "#cc9d0a90",
];

const Bargraph = ({ aspect, title }) => {
  const ref = useRef(false);
  let departmentData = new Map([
    ["CORE", 0],
    ["ME", 0],
    ["B.Farma", 0],
    ["AIML", 0],
    ["IOT", 0],
    ["DS", 0],
    ["ECE", 0],
  ]);
  const [barData, setBarData] = useState();
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
          departmentData.set(
            soc.department.replace("CSE ", ""),
            departmentData.get(soc.department.replace("CSE ", "")) +
              soc.events.length
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
        console.log(barData);
        setBarData(barData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (ref.current === false) {
      barDataFetch();
      return () => (ref.current = true);
    }
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart data={barData}>
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
          <Bar dataKey="num" type="monotone" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bargraph;

// const socData = {
//   department: soc.department,
//   events: soc.events.length,
//   fill: barColors[index % barColors.length],
// };
