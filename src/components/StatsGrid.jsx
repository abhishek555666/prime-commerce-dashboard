import React from 'react';
import StatsCard from './StatsCard.jsx';
import styles from '../styles/StatsGrid.module.css';

export default function StatsGrid({ cards }) {
  return (
    <section aria-label="Summary metrics" className={styles.grid}>
      {cards.map((card) => (
        <StatsCard
          key={card.id}
          title={card.title}
          value={card.value}
          valueFormat={card.value_format}
          trendPct={card.trend_pct}
        />
      ))}
    </section>
  );
}
