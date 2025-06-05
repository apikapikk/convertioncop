import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

interface StirlingChartProps {
  chartData: { x: number; y: number }[];
  dataX: number[];
  dataY: number[][];
  interpolatedX: number | null;
  result: number | null;
}

const StirlingChart: React.FC<StirlingChartProps> = ({
  chartData,
  dataX = [],
  dataY = [],
  interpolatedX,
  result,
}) => {
  // Pastikan dataY dan dataX punya panjang yang cukup untuk akses dataY[0][i]
  const hasValidData = dataY.length > 0 && dataX.length > 0;

  return (
    <LineChart
      width={800}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="x"
        type="number"
        domain={["auto", "auto"]}
        label={{ value: "Bulan (x)", position: "insideBottomRight", offset: 0 }}
      />
      <YAxis
        type="number"
        domain={["auto", "auto"]}
        label={{ value: "Nilai USD (y)", angle: -90, position: "insideLeft" }}
      />
      <Tooltip />
      <Legend />

      {/* Garis interpolasi */}
      <Line
        type="monotone"
        dataKey="y"
        stroke="#8884d8"
        dot={false}
        name="Interpolasi Stirling"
        strokeWidth={2}
      />

      {/* Titik data asli */}
      <Scatter
        data={
          hasValidData
            ? dataX.map((x, i) => ({ x, y: dataY[0][i] }))
            : []
        }
        fill="#82ca9d"
        name="Titik Data Asli"
      />

      {/* Titik interpolasi */}
      {interpolatedX !== null && result !== null && (
        <Scatter
          data={[
            {
              x: interpolatedX,
              y: result,
            },
          ]}
          fill="red"
          shape="cross"
          name="Titik Interpolasi"
        />
      )}
    </LineChart>
  );
};

export default StirlingChart;
