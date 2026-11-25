const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

/**
 * Formats an integer amount in INR with the rupee symbol and Indian grouping.
 * @param {number} amount
 * @returns {string}
 */
export function formatInr(amount) {
  return `₹${inrFormatter.format(amount)}`;
}

/**
 * Formats a metric card value according to its declared value_format.
 * @param {number} value
 * @param {'currency' | 'integer' | 'percentage'} format
 * @returns {string}
 */
export function formatMetricValue(value, format) {
  if (format === 'currency') {
    return formatInr(value);
  }
  if (format === 'percentage') {
    return `${value.toFixed(1)}%`;
  }
  return inrFormatter.format(value);
}

/**
 * Formats a percentage trend value with an explicit sign.
 * @param {number} trendPct
 * @returns {string}
 */
export function formatTrend(trendPct) {
  const prefix = trendPct >= 0 ? '+' : '';
  return `${prefix}${trendPct.toFixed(1)}%`;
}
