import React from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headingBlock}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>
          Sales performance and recent activity
        </p>
      </div>
      <div className={styles.periodBadge} aria-label="Reporting period October to November 2026">
        October – Nov
      </div>
    </header>
  );
}
