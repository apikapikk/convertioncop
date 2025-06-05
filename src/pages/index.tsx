import React, { useState } from "react";
import StirlingInput from "../components/StirlingInput";
import ForwardTable from "../components/ForwardTable";
import StirlingChart from "../components/StirlingChart";
import StirlingTheory from "../components/StirlingTheory";
import { stirlingInterpolation, forwardDifferences } from "../lib/StirlingInterpolation";
import styles from "../styles/Home.module.css";

const HomePage: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [dataX, setDataX] = useState<number[]>([]);
  const [dataY, setDataY] = useState<number[][]>([]);
  const [interpolatedX, setInterpolatedX] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  const handleCalculate = (xArr: number[], yArr: number[], X: number) => {
    try {
      const h = xArr[1] - xArr[0];
      for (let i = 1; i < xArr.length; i++) {
        if (xArr[i] - xArr[i - 1] !== h) {
          throw new Error("Data x harus berjarak sama dan berurutan");
        }
      }
      if (xArr.length < 3) {
        throw new Error("Minimal 3 titik data diperlukan");
      }

      const val = stirlingInterpolation(xArr, yArr, X);
      setResult(val);
      setError("");
      setInterpolatedX(X);

      const fdTable = forwardDifferences(yArr);
      setDataX(xArr);
      setDataY(fdTable);

      const minX = xArr[0];
      const maxX = xArr[xArr.length - 1];
      const step = (maxX - minX) / 100;
      const curveData = [];

      for (let xi = minX; xi <= maxX; xi += step) {
        const yi = stirlingInterpolation(xArr, yArr, xi);
        curveData.push({ x: xi, y: yi });
      }
      setChartData(curveData);
    } catch (e: any) {
      setError(e.message || "Terjadi kesalahan");
      setResult(null);
      setDataX([]);
      setDataY([]);
      setChartData([]);
      setInterpolatedX(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Interpolasi Stirling - Kurs USD ke IDR</h1>

      <StirlingInput onCalculate={handleCalculate} />

      {error && <p className={styles.error}>{error}</p>}

      {result !== null && (
        <p className={styles.result}>
          Hasil interpolasi pada nilai X = {interpolatedX} adalah:{" "}
          <strong>{result.toFixed(4)}</strong>
        </p>
      )}

      {dataY.length > 0 && (
        <>
          <ForwardTable dataX={dataX} dataY={dataY} />
          <StirlingChart
            chartData={chartData}
            originalData={dataX.map((x, i) => ({ x, y: dataY[0][i] }))}
            interpolatedPoint={
              interpolatedX !== null && result !== null
                ? { x: interpolatedX, y: result }
                : null
            }
          />
        </>
      )}

      <StirlingTheory />
    </div>
  );
};

export default HomePage;
