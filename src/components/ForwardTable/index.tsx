import React from "react";
import styles from "./ForwardTable.module.css";

interface ForwardTableProps {
  dataY: number[][];
}

const ForwardTable: React.FC<ForwardTableProps> = ({ dataY }) => {
  if (dataY.length === 0) return null;
  const n = dataY.length;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Tabel Forward Differences</h2>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>y</th>
            {Array.from({ length: n - 1 }).map((_, i) => (
              <th key={i}>Δ^{i + 1}y</th>
            ))}
          </tr>
        </thead>
        <tbody>
      {dataY[0].map((_, rowIdx) => (
        <tr key={rowIdx}>
          {dataY.map((col, colIdx) => (
            <td key={colIdx} className={styles.tableCell}>
              {col[rowIdx] !== undefined ? col[rowIdx].toFixed(4) : ""}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
      </table>
    </div>
  );
};

export default ForwardTable;
