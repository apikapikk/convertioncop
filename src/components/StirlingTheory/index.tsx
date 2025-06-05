import React from "react";
import styles from "./StirlingTheory.module.css";

const StirlingTheory: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Penjelasan Metode Interpolasi Stirling</h2>
      <p>
        Metode Interpolasi Stirling digunakan untuk mengestimasi nilai fungsi di titik yang tidak diketahui,
        dengan menggunakan titik-titik data yang berurutan dan simetris di sekitar titik tengah.
        Metode ini menggabungkan interpolasi diferensial maju dan mundur untuk hasil yang lebih akurat.
      </p>

      <h3 className={styles.heading}>Rumus Interpolasi Stirling:</h3>
      <div className={styles.formula}>
        <code className={styles.code}>
          P(x) = y₀ + (p²/2!)Δ²y₀ + p(Δy₀ + Δy₋₁)/2 + (p(p² - 1)/3!)Δ³y₀ + ...
        </code>
      </div>

      <p>Dengan:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>p = (x - x₀) / h, dengan h adalah jarak antar titik x yang berurutan</li>
        <li className={styles.listItem}>Δ adalah operator selisih (difference operator)</li>
        <li className={styles.listItem}>y₀ adalah nilai fungsi di titik tengah</li>
      </ul>
    </section>
  );
};

export default StirlingTheory;
