import React from 'react';
import styles from '../styles/Pagination.module.css';

function buildPageList(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push('ellipsis-start');
  }
  for (let p = start; p <= end; p += 1) {
    pages.push(p);
  }
  if (end < totalPages - 1) {
    pages.push('ellipsis-end');
  }
  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  filteredCount,
  totalCount,
  onPageChange,
}) {
  const startItem = filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredCount);
  const isFiltered = filteredCount !== totalCount;
  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className={styles.footer}>
      <p className={styles.summary} aria-live="polite">
        {filteredCount === 0
          ? `Showing 0 of ${totalCount} transactions`
          : isFiltered
          ? `Showing ${startItem}–${endItem} of ${filteredCount} matching transactions (${totalCount} total)`
          : `Showing ${startItem}–${endItem} of ${totalCount} transactions`}
      </p>

      {totalPages > 1 && (
        <nav aria-label="Transactions pagination" className={styles.nav}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            Prev
          </button>

          <div className={styles.pageNumbers}>
            {pages.map((item) => {
              if (typeof item === 'string') {
                return (
                  <span key={item} className={styles.ellipsis} aria-hidden="true">
                    …
                  </span>
                );
              }
              const isCurrent = item === currentPage;
              return (
                <button
                  key={item}
                  type="button"
                  className={`${styles.pageBtn} ${
                    isCurrent ? styles.pageBtnActive : ''
                  }`}
                  onClick={() => onPageChange(item)}
                  aria-current={isCurrent ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
