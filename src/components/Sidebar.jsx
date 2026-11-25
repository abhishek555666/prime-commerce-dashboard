import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

function BrandMark() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.logoIcon}
    >
      <rect x="8" y="8" width="94" height="94" rx="25" fill="#2767E8" />
      <path
        d="M31 67V38h20q17 0 17 15T51 67H31m0-15h20"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="9"
        strokeLinejoin="round"
      />
      <path
        d="m58 79 19-22"
        stroke="#BDF5EA"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Sidebar() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '#main-content', icon: '◫' },
    {
      id: 'transactions',
      label: 'Transactions',
      href: '#transactions',
      icon: '▤',
    },
    { id: 'sales', label: 'Sales', href: '#summary-metrics', icon: '◉' },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
  };

  return (
    <aside className={styles.sidebar} aria-label="Primary">
      <div className={styles.topRow}>
        <a
          href="#main-content"
          className={styles.brand}
          onClick={() => handleNavClick('dashboard')}
        >
          <BrandMark />
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>PRIME</span>
            <span className={styles.brandSubtitle}>COMMERCE</span>
          </span>
        </a>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <span aria-hidden="true">{mobileMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      <nav
        id="primary-navigation"
        aria-label="Primary navigation"
        className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}
      >
        {navItems.map((item) => {
          const isCurrent = activeNav === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={`${styles.navLink} ${
                isCurrent ? styles.navLinkActive : ''
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className={styles.navIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
