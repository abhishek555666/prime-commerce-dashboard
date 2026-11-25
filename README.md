# Prime Commerce Console

Internal sales-monitoring admin dashboard for **Prime Ecommerce Store India**, built with React, Vite, and CSS Modules. It displays four authoritative summary metric cards alongside an interactive, sortable, filterable, and paginated transaction console covering 84 store records.

---

## Technology Stack

- **UI Library:** React `^18.3.1`, React DOM `^18.3.1`
- **Build Tool & Dev Server:** Vite `^5.4.10`
- **Styling:** CSS Modules (`*.module.css`) + global base styles (`src/styles/global.css`)
- **Linting & Accessibility:** ESLint `^8.57.1` (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`)
- **Data Fixtures:** Static JSON datasets in `src/data/` (`summary.json`, `transactions.json`, `filters.json`)

---

## Installation Instructions

**Prerequisites:** Node.js 18+ and npm.

1. Navigate to the React project directory:
   ```bash
   cd INPUT_FILES/REACT_STARTER
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

No `.env` file, API keys, or backend credentials are required.

---

## Local Development Instructions

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (by default `http://localhost:5173/`).

---

## Component Structure

```text
INPUT_FILES/REACT_STARTER/
├── index.html
├── package.json
├── .eslintrc.cjs
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                          # React root mount + global styles
    ├── App.jsx                           # State orchestration (search, filters, sort, pagination)
    ├── data.js                           # Re-exports JSON fixtures from src/data/
    ├── data/
    │   ├── summary.json                  # Authoritative KPI card values and period metadata
    │   ├── transactions.json             # 84 transaction records
    │   └── filters.json                  # Allowed channels, statuses, sort/search fields, page size
    ├── components/
    │   ├── Sidebar.jsx                   # Responsive sidebar navigation & mobile header toggle
    │   ├── Header.jsx                    # Dashboard Overview heading & reporting period badge
    │   ├── StatsGrid.jsx                 # Responsive 4-card / 2-card KPI grid
    │   ├── StatsCard.jsx                 # Reusable metric card with formatted value & trend pill
    │   ├── TransactionFilters.jsx        # Search box, channel/status selects, mobile sort, reset button
    │   ├── TransactionTable.jsx          # Sortable desktop table, mobile transaction cards & empty state
    │   └── Pagination.jsx                # Page navigation & visible record range summary
    ├── styles/
    │   ├── global.css
    │   ├── App.module.css
    │   ├── Sidebar.module.css
    │   ├── Header.module.css
    │   ├── StatsGrid.module.css
    │   ├── StatsCard.module.css
    │   ├── TransactionFilters.module.css
    │   ├── TransactionTable.module.css
    │   └── Pagination.module.css
    └── utils/
        ├── formatters.js                 # INR Indian grouping currency, integer, percentage & trend formatters
        └── transactionUtils.js           # Immutable filterTransactions & stable sortTransactions helpers
```

---

## Features & Functionality

- **Summary Metric Cards (`StatsGrid` & `StatsCard`):**
  - Renders the 4 authoritative KPIs from `src/data/summary.json`: **Completed Sales** (`₹2,01,095`, `+8.4%`), **Total Transactions** (`84`, `+5.2%`), **Completed Orders** (`53`, `+3.8%`), and **Completion Rate** (`63.1%`, `+1.7%`).
  - Uses Indian number grouping (`en-IN`) for INR amounts.
- **Client-Side Search (`TransactionFilters`):**
  - Case-insensitive substring search across `transaction_id`, `customer_name`, and `product`, with a quick clear (`×`) button.
- **Combined Filtering:**
  - Filter by **Channel** (`Online`, `Marketplace`, `Retail`) and **Status** (`Completed`, `Refunded`, `Pending`, `Failed`), combined simultaneously without mutating the source array.
- **Stable & Reversible Sorting (`TransactionTable` & `TransactionFilters`):**
  - Sort by **Transaction ID** (`transaction_id`), **Date** (`date`), or **Amount** (`amount_inr`) in ascending or descending order using keyboard-accessible `aria-sort` column headers on desktop and a synced sort dropdown on mobile.
  - Defaults to `date` descending per `src/data/filters.json`.
- **Pagination (`Pagination`):**
  - Displays `10` rows per page (`filters.page_size`), making all `84` records accessible across 9 pages, and resets to page 1 when search, filter, or sort criteria change.
- **Responsive & Accessible UI:**
  - Desktop sidebar (`240px`), tablet sidebar (`200px` at `769px–1024px`), and mobile top bar with toggleable drawer (`<= 768px`).
  - Table switches to compact transaction cards at `<= 768px` to prevent horizontal overflow down to `320px`.
  - Visible `:focus-visible` outlines (`3px solid #2767E8`), semantic landmarks, and clear empty-state reset controls.

---

## Build Instructions

Run ESLint (including `jsx-a11y` and React Hooks rules) and build the production bundle:

```bash
npm run lint
npm run build
```

The optimized static bundle is generated in `dist/`. You can preview the production build locally with:

```bash
npm run preview
```

---

## Vercel Deployment Instructions

### Option A: Deploy via Vercel Dashboard (GitHub)
1. Push the contents of this project (`INPUT_FILES/REACT_STARTER`, excluding `node_modules` and `dist`) to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New → Project**.
3. Import your GitHub repository.
4. Configure the project settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `.` (if this folder is the repository root) or `INPUT_FILES/REACT_STARTER` (if pushing the full workspace)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. No environment variables are required.

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
cd INPUT_FILES/REACT_STARTER
vercel --prod
```
