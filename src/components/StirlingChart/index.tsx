import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Scatter,
  ResponsiveContainer,
} from "recharts";

export interface Point {
  x: number;
  y: number;
}

export interface StirlingChartProps {
  chartData: Point[];
  originalData: Point[];
  interpolatedPoint: Point | null;
}

const StirlingChart: React.FC<StirlingChartProps> = ({
  chartData,
  originalData,
  interpolatedPoint,
}) => {
  return (
    <div style={{ marginTop: "2rem", width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />

          {/* Garis hasil interpolasi Stirling */}
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} name="Interpolasi" />

          {/* Titik data asli */}
          <Scatter data={originalData} fill="#82ca9d" name="Data Asli" />

          {/* Titik hasil interpolasi */}
          {interpolatedPoint && (
            <Scatter
              data={[interpolatedPoint]}
              fill="#ff4d4f"
              name="Titik Interpolasi"
              shape="star"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StirlingChart;
