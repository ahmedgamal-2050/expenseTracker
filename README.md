## Expense Tracker (Angular + Nx)

An opinionated, mobile‑first expense tracking app built with Angular, Tailwind CSS, and Nx. It includes authentication, a dashboard with income/expense summaries, an expenses form with categories and receipt upload, i18n (EN/AR) with RTL support, dark mode, and a mock API powered by json‑server.

### Features

- **Authentication**: Simple login that stores token and user details.
- **Dashboard**: Total balance card, income/expense stats, recent expenses, and period filter (this month/quarter/year, etc.).
- **Expenses**: Add expense form with category selection, amount, date (native picker), and receipt upload.
- **Theming**: Light/Dark theme toggle with `localStorage` persistence.
- **i18n + RTL**: English/Arabic translations with automatic direction switching (LTR/RTL).
- **Navigation**: Top navbar, sidebar (desktop), and bottom navbar (mobile).
- **Mock API**: `json-server` endpoints for login, categories, and expenses.
- **Testing**: Jest + Angular testing utilities with high coverage.

### Tech Stack

- Angular (Standalone APIs, Signals)
- Nx workspace tooling
- Tailwind CSS v4
- json‑server (mock API)
- Jest

---

## Installation

### Prerequisites

- Node.js 18+ and npm 9+

### Install dependencies

```bash
npm install
```

### Start the mock API

```bash
npm run json-server
```

This serves the mock API at `http://localhost:4300` using `db.json`.

### Start the web app (dev)

```bash
npm run start
```

The app runs on `http://localhost:4000` and opens in your default browser.

> Tip: Keep the API and web app running in separate terminals for a complete local experience.

---

## Usage

1. Open `http://localhost:4000`.
2. Log in (mocked via `json-server`). A token and user data are stored in `localStorage`.
3. Explore the Dashboard: balance card, period filter, recent expenses.
4. Go to Expenses → Add to submit a new expense (category, amount, date, optional receipt).
5. Use the top navbar to toggle theme (Light/Dark) and language (EN/AR). Language changes also switch layout direction (LTR/RTL).

---

## Configuration

- **Internationalization**

  - Translation files live under `apps/expenseTracker/src/assets/i18n/` (`en.json`, `ar.json`).
  - The active language is stored in `localStorage` under `language` and applied at app init.

- **Theme**

  - The current theme is stored under `theme` in `localStorage` and applied to `document.documentElement` via the `dark` class.

- **Auth Guard**

  - The dashboard is protected by a guard that checks for a `token` in `localStorage`.

- **Mock API**

  - The mock API reads `db.json` at the repo root. Example resources:
    - `GET http://localhost:4300/login` → returns a static login response
    - `GET http://localhost:4300/categories` → list categories
    - `GET/POST http://localhost:4300/expenses` → list/add expenses

- **Currency**
  - A currency service (mocked) and a conversion pipe are included for displaying values.

---

## Scripts

```bash
# Development
npm run start                 # Serve the Angular app on port 4000
npm run json-server           # Start mock API on port 4300

# Testing
npm run test                  # Run unit tests for expenseTracker
npm run test:watch            # Watch mode
npm run test:coverage         # Tests with coverage
npm run test:all              # Tests across all projects
npm run test:affected         # Tests for affected projects
```

---

## Project Structure

```
apps/expenseTracker/
  src/app/
    common/           # shared components, guards, constants, services, pipes
    layout/           # layout shells & routes (auth, dashboard)
    pages/            # feature pages (auth/login, dashboard/home, expenses/*)
  assets/i18n/        # translations (en, ar)
  assets/styles/      # tailwind.css and global styles

db.json               # json-server mock data
```

---

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes with clear, typed Angular code (Standalone components, Signals where appropriate).
3. Add/adjust unit tests and ensure they pass: `npm run test:coverage`.
4. Open a Pull Request describing the change and rationale.

---

## License

This project is licensed under the **MIT License**. If the `LICENSE` file is missing, feel free to submit a PR adding one.

---

### Acknowledgements

- Built with Angular and Nx.
- UI styled with Tailwind CSS.
