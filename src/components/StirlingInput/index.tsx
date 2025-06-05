import React, { useState } from "react";
import styles from "./StirilingInput.module.css";

interface StirlingInputProps {
  onCalculate: (x: number[], y: number[], X: number) => void;
}

const StirlingInput: React.FC<StirlingInputProps> = ({ onCalculate }) => {
  const [xValues, setXValues] = useState("");
  const [yValues, setYValues] = useState("");
  const [X, setX] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const x = xValues.split(",").map((val) => parseFloat(val.trim()));
    const y = yValues.split(",").map((val) => parseFloat(val.trim()));
    const target = parseFloat(X);

    if (x.length !== y.length) {
      alert("Jumlah nilai x dan y harus sama");
      return;
    }

    onCalculate(x, y, target);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="x">Nilai X (dipisahkan koma):</label>
        <input
          id="x"
          type="text"
          value={xValues}
          onChange={(e) => setXValues(e.target.value)}
          placeholder="Contoh: 1, 2, 3, 4"
          className={styles.inputField} // tambahkan className
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="y">Nilai Y (dipisahkan koma):</label>
        <input
          id="y"
          type="text"
          value={yValues}
          onChange={(e) => setYValues(e.target.value)}
          placeholder="Contoh: 14500, 14600, 14700, 14800"
          className={styles.inputField}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="target">Nilai X yang dicari:</label>
        <input
          id="target"
          type="number"
          value={X}
          onChange={(e) => setX(e.target.value)}
          placeholder="Contoh: 2.5"
          className={styles.inputField}
        />
      </div>
      <button type="submit" className={styles.button}>Hitung Interpolasi</button>
    </form>
  );
};

export default StirlingInput;
