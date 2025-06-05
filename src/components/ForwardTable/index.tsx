import React from "react";
import styles from "./ForwardTable.module.css";

export interface CentralDifferenceTableProps {
  dataX: number[];
  dataY: number[][]; // data selisih tengah per orde, misal Δy, Δ²y, dst.
}

const CentralDifferenceTable: React.FC<CentralDifferenceTableProps> = ({ dataX, dataY }) => {
  // dataY[0] = f(x)
  // dataY[1] = Δy (central difference orde 1)
  // dataY[2] = Δ²y (central difference orde 2), dst.

  const maxOrder = dataY.length;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Tabel Selisih Tengah (Central Difference)</h3>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>x</th>
            <th className={styles.tableCell}>f(x)</th>
            {Array.from({ length: maxOrder - 1 }, (_, i) => (
              <th key={i} className={styles.tableCell}>
                Δ^{i + 1}y
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataX.map((xVal, rowIndex) => (
            <tr key={rowIndex}>
              <td className={styles.tableCell}>{xVal}</td>
              {dataY.map((orderArr, colIndex) => (
                <td key={colIndex} className={styles.tableCell}>
                  {orderArr[rowIndex] !== undefined ? orderArr[rowIndex].toFixed(4) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentralDifferenceTable;
