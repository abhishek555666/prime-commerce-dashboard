import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import TransactionFilters from './components/TransactionFilters.jsx';
import TransactionTable from './components/TransactionTable.jsx';
import Pagination from './components/Pagination.jsx';
import { filters, summary, transactions } from './data.js';
import {
  filterTransactions,
  sortTransactions,
} from './utils/transactionUtils.js';
import styles from './styles/App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortField, setSortField] = useState(filters.default_sort.field);
  const [sortDirection, setSortDirection] = useState(
    filters.default_sort.direction
  );
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = filters.page_size;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedChannel !== 'ALL' ||
    selectedStatus !== 'ALL';

  const processedTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, {
      searchQuery,
      channel: selectedChannel,
      status: selectedStatus,
      searchFields: filters.search_fields,
    });
    return sortTransactions(filtered, sortField, sortDirection);
  }, [searchQuery, selectedChannel, selectedStatus, sortField, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(processedTransactions.length / pageSize)
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return processedTransactions.slice(startIndex, startIndex + pageSize);
  }, [processedTransactions, safePage, pageSize]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleChannelChange = (value) => {
    setSelectedChannel(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleToggleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(field === 'transaction_id' ? 'asc' : 'desc');
    }
    setCurrentPage(1);
  };

  const handleSortSelect = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedChannel('ALL');
    setSelectedStatus('ALL');
    setCurrentPage(1);
  };

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.workspace} id="main-content">
          <div id="summary-metrics">
            <StatsGrid cards={summary.metric_cards} />
          </div>

          <section
            id="transactions"
            aria-labelledby="transactions-heading"
            className={styles.transactionsSection}
          >
            <div className={styles.sectionHeader}>
              <h2 id="transactions-heading" className={styles.sectionTitle}>
                Transactions
              </h2>
              <p className={styles.sectionSubtitle}>
                Review, filter and sort recent store activity
              </p>
            </div>

            <div className={styles.tableArea}>
              <TransactionFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedChannel={selectedChannel}
                onChannelChange={handleChannelChange}
                selectedStatus={selectedStatus}
                onStatusChange={handleStatusChange}
                channels={filters.channels}
                statuses={filters.statuses}
                sortField={sortField}
                sortDirection={sortDirection}
                onSortSelect={handleSortSelect}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />

              <TransactionTable
                transactions={paginatedTransactions}
                sortField={sortField}
                sortDirection={sortDirection}
                onToggleSort={handleToggleSort}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                pageSize={pageSize}
                filteredCount={processedTransactions.length}
                totalCount={transactions.length}
                onPageChange={setCurrentPage}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
