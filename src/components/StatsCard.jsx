import React from 'react';
import { formatMetricValue, formatTrend } from '../utils/formatters.js';
import styles from '../styles/StatsCard.module.css';

export default function StatsCard({ title, value, valueFormat, trendPct }) {
  const formattedValue = formatMetricValue(value, valueFormat);
  const formattedTrend = formatTrend(trendPct);
  const isPositive = trendPct >= 0;

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{formattedValue}</p>
      <div className={styles.trendRow}>
        <span
          className={`${styles.trendBadge} ${isPositive ? styles.trendPositive : styles.trendNegative}`}
          aria-label={`${formattedTrend} compared to prior reference period`}
        >
          {formattedTrend}
        </span>
      </div>
    </article>
  );
}
