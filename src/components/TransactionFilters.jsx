import React from 'react';
import styles from '../styles/TransactionFilters.module.css';

export default function TransactionFilters({
  searchQuery,
  onSearchChange,
  selectedChannel,
  onChannelChange,
  selectedStatus,
  onStatusChange,
  channels,
  statuses,
  sortField,
  sortDirection,
  onSortSelect,
  hasActiveFilters,
  onResetFilters,
}) {
  const sortValue = `${sortField}:${sortDirection}`;

  return (
    <div className={styles.toolbar} role="search" aria-label="Filter and search transactions">
      <div className={styles.searchGroup}>
        <label htmlFor="tx-search" className={styles.srOnly}>
          Search by transaction ID, customer name, or product
        </label>
        <div className={styles.searchWrap}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="tx-search"
            type="text"
            className={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className={styles.controlsGroup}>
        <div className={styles.selectWrap}>
          <label htmlFor="tx-channel" className={styles.srOnly}>
            Filter by channel
          </label>
          <select
            id="tx-channel"
            className={styles.select}
            value={selectedChannel}
            onChange={(e) => onChannelChange(e.target.value)}
          >
            <option value="ALL">All channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrap}>
          <label htmlFor="tx-status" className={styles.srOnly}>
            Filter by status
          </label>
          <select
            id="tx-status"
            className={styles.select}
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="ALL">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.selectWrap} ${styles.mobileSortWrap}`}>
          <label htmlFor="tx-sort-mobile" className={styles.srOnly}>
            Sort transactions
          </label>
          <select
            id="tx-sort-mobile"
            className={styles.select}
            value={sortValue}
            onChange={(e) => {
              const [field, direction] = e.target.value.split(':');
              onSortSelect(field, direction);
            }}
          >
            <option value="date:desc">Sort: Date (Newest)</option>
            <option value="date:asc">Sort: Date (Oldest)</option>
            <option value="amount_inr:desc">Sort: Amount (High–Low)</option>
            <option value="amount_inr:asc">Sort: Amount (Low–High)</option>
            <option value="transaction_id:asc">Sort: ID (A–Z)</option>
            <option value="transaction_id:desc">Sort: ID (Z–A)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={onResetFilters}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
