import React from 'react';
import { formatInr } from '../utils/formatters.js';
import styles from '../styles/TransactionTable.module.css';

const STATUS_CLASS_MAP = {
  Completed: styles.statusCompleted,
  Pending: styles.statusPending,
  Refunded: styles.statusRefunded,
  Failed: styles.statusFailed,
};

function SortIndicator({ active, direction }) {
  if (!active) {
    return (
      <span className={styles.sortIconMuted} aria-hidden="true">
        ↕
      </span>
    );
  }

  return (
    <span className={styles.sortIconActive} aria-hidden="true">
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );
}

export default function TransactionTable({
  transactions,
  sortField,
  sortDirection,
  onToggleSort,
  hasActiveFilters,
  onResetFilters,
}) {
  const getAriaSort = (field) => {
    if (sortField !== field) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  if (transactions.length === 0) {
    return (
      <div className={styles.emptyState} role="status" aria-live="polite">
        <p className={styles.emptyTitle}>No matching transactions</p>
        <p className={styles.emptyCopy}>
          No records match your current search or filter criteria. Try adjusting
          your keywords or resetting the active filters.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.emptyResetBtn}
            onClick={onResetFilters}
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className={styles.srOnly}>Store transactions</caption>
          <thead>
            <tr>
              <th scope="col" aria-sort={getAriaSort('transaction_id')}>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onToggleSort('transaction_id')}
                  aria-label={`Sort by transaction ID (${
                    sortField === 'transaction_id' && sortDirection === 'asc'
                      ? 'currently ascending'
                      : sortField === 'transaction_id'
                      ? 'currently descending'
                      : 'not sorted'
                  })`}
                >
                  <span>TRANSACTION</span>
                  <SortIndicator
                    active={sortField === 'transaction_id'}
                    direction={sortDirection}
                  />
                </button>
              </th>
              <th scope="col" aria-sort={getAriaSort('date')}>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onToggleSort('date')}
                  aria-label={`Sort by date (${
                    sortField === 'date' && sortDirection === 'asc'
                      ? 'currently oldest first'
                      : sortField === 'date'
                      ? 'currently newest first'
                      : 'not sorted'
                  })`}
                >
                  <span>DATE</span>
                  <SortIndicator
                    active={sortField === 'date'}
                    direction={sortDirection}
                  />
                </button>
              </th>
              <th scope="col">CUSTOMER</th>
              <th scope="col">CHANNEL</th>
              <th scope="col" aria-sort={getAriaSort('amount_inr')}>
                <button
                  type="button"
                  className={styles.sortBtn}
                  onClick={() => onToggleSort('amount_inr')}
                  aria-label={`Sort by amount (${
                    sortField === 'amount_inr' && sortDirection === 'asc'
                      ? 'currently low to high'
                      : sortField === 'amount_inr'
                      ? 'currently high to low'
                      : 'not sorted'
                  })`}
                >
                  <span>AMOUNT</span>
                  <SortIndicator
                    active={sortField === 'amount_inr'}
                    direction={sortDirection}
                  />
                </button>
              </th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const statusClass = STATUS_CLASS_MAP[tx.status] ?? '';
              return (
                <tr key={tx.transaction_id} className={styles.row}>
                  <td className={styles.txId}>{tx.transaction_id}</td>
                  <td className={styles.dateCell}>{tx.date}</td>
                  <td>
                    <div className={styles.customerName}>{tx.customer_name}</div>
                    <div className={styles.productSub}>
                      {tx.product} · Qty {tx.quantity}
                    </div>
                  </td>
                  <td>{tx.channel}</td>
                  <td className={styles.amountCell}>
                    {formatInr(tx.amount_inr)}
                  </td>
                  <td>
                    <span className={`${styles.statusText} ${statusClass}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {transactions.map((tx) => {
          const statusClass = STATUS_CLASS_MAP[tx.status] ?? '';
          return (
            <article key={tx.transaction_id} className={styles.mobileCard}>
              <div className={styles.mobileCardTop}>
                <span className={styles.txId}>{tx.transaction_id}</span>
                <span className={styles.mobileDate}>{tx.date}</span>
              </div>
              <p className={styles.mobileMeta}>
                {tx.customer_name} • {tx.channel} • {tx.product}
              </p>
              <div className={styles.mobileCardBottom}>
                <span className={styles.mobileAmount}>
                  {formatInr(tx.amount_inr)}
                </span>
                <span className={`${styles.statusText} ${statusClass}`}>
                  {tx.status}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
