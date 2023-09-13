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
import { useEffect, useRef } from "react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Chart = ({ aspect, title }) => {
  let monthData = new Map([
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["May", 0],
    ["Jun", 0],
    ["Jul", 0],
    ["Aug", 0],
    ["Sep", 0],
    ["Oct", 0],
    ["Nov", 0],
    ["Dec", 0],
  ]);
  const [areaData, setAreaData] = useState([]);
  const areaDataFetch = () => {
    fetch(`${BACKEND_URL}/home/all/areagraph`)
      .then((res) => {
        if (res.status !== 201) {
          throw new Error("Something went wrong!!");
        }
        return res.json();
      })
      .then((res) => {
        res.map((event) => {
          const month = monthNameMap[event.date.split("-")[1]];
          monthData.set(month, monthData.get(month) + 1);
          return monthData;
        });
        let temp = [];
        monthData.forEach((value, key) => {
          temp.push({
            month: key,
            num: value,
          });
        });
        setAreaData(temp);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ref = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (ref.current === false) {
      areaDataFetch();
      return () => (ref.current = true);
    }
  }, [areaData]);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {isLoading ? (
        <div className="loader">
          <RotatingLines
            strokeColor="#007bff"
            strokeWidth="4"
            animationDuration="1.3"
            width="80"
            visible={true}
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart width={730} height={250} data={areaData}>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="gray" />
            <YAxis width={40} />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="num"
              stroke="#007bff"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;

const monthNameMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
