import "./chart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Bargraph = ({ aspect, title, barData }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart data={barData}>
          <XAxis dataKey="department" />
          <YAxis width={25} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Bar dataKey="num" type="monotone" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bargraph;


