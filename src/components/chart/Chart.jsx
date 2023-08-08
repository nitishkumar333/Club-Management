import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";


const Chart = ({ aspect, title }) => {
  let monthData = new Map([
    ["01", 0],
    ["02", 0],
    ["03", 0],
    ["04", 0],
    ["05", 0],
    ["06", 0],
    ["07", 0],
    ["08", 0],
    ["09", 0],
    ["10", 0],
    ["11", 0],
    ["12", 0],
  ]);
  const [areaData, setAreaData] = useState();
  useEffect(() => {
    fetch("http://localhost:8080/home/all/areagraph")
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Something went wrong!!");
        }
        return res.json();
      })
      .then((res) => {
        res.map((event) => {
          monthData.set(
            event.date.split("-")[1],
            monthData.get(event.date.split("-")[1]) + 1
          );
          return monthData;
        });
        let temp = [];
        monthData.forEach((value, key) => {
          temp.push({
            month: key,
            num: value,
          });
        });
        console.log(temp);
        setAreaData(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={areaData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="num"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;