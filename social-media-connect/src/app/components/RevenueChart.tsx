// src/app/components/RevenueChart.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface RevenueChartProps {
  data?: Array<{ month: string; revenue: number }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  data = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 7000 },
  ],
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
