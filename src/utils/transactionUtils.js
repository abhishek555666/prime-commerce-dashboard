/**
 * Filters transactions without mutating the source array.
 * @param {Array<Object>} transactions
 * @param {Object} options
 * @param {string} options.searchQuery
 * @param {string} options.channel
 * @param {string} options.status
 * @param {Array<string>} options.searchFields
 * @returns {Array<Object>}
 */
export function filterTransactions(
  transactions,
  { searchQuery, channel, status, searchFields }
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return transactions.filter((tx) => {
    if (channel !== 'ALL' && tx.channel !== channel) {
      return false;
    }
    if (status !== 'ALL' && tx.status !== status) {
      return false;
    }
    if (normalizedQuery) {
      const matchesField = searchFields.some((field) =>
        String(tx[field] ?? '')
          .toLowerCase()
          .includes(normalizedQuery)
      );
      if (!matchesField) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Returns a newly sorted copy of transactions without mutating the input array.
 * Uses transaction_id as a deterministic tie-breaker for stable ordering.
 * @param {Array<Object>} transactions
 * @param {'date' | 'amount_inr' | 'transaction_id'} sortField
 * @param {'asc' | 'desc'} sortDirection
 * @returns {Array<Object>}
 */
export function sortTransactions(transactions, sortField, sortDirection) {
  const multiplier = sortDirection === 'asc' ? 1 : -1;

  return [...transactions].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'amount_inr') {
      comparison = a.amount_inr - b.amount_inr;
    } else if (sortField === 'date') {
      comparison = a.date.localeCompare(b.date);
    } else {
      comparison = a.transaction_id.localeCompare(b.transaction_id);
    }

    if (comparison !== 0) {
      return comparison * multiplier;
    }

    return a.transaction_id.localeCompare(b.transaction_id);
  });
}
