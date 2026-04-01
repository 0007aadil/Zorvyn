# Zorvyn Finance Dashboard

A clean, interactive, and highly responsive finance tracking dashboard built to fulfill the core frontend evaluation requirements. 

This application demonstrates a modular approach to React component design, an robust custom-built design system, and global state management using React's built-in tooling without relying on heavy external libraries.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)

### Setup Instructions
1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit the local address provided (typically `http://localhost:5173`).

---

## 🎨 Overview of Approach

My primary goal was to achieve a dynamic, visually stunning "glassmorphic" interface while keeping the foundation lightweight. 
- **Tech Stack:** React 18, Vite, TypeScript.
- **Styling Method:** Pure vanilla CSS. I chose to bypass Tailwind or MUI to demonstrate a strong command of CSS Variables (for theming), CSS Grid (for complex, responsive dashboard layouts), and custom animations.
- **Data Rendering:** `react-chartjs-2` is utilized for data visualization, and `date-fns` handles reliable time-series parsing for chronologically sorting transaction data.
- **Data Source:** I utilized static mock data representing highly realistic localized transaction scenarios (calibrated to INR and recent 2026 inflation metrics).

---

## ✨ Features & Requirements Met

### 1. Dashboard Overview
- **Summary Cards:** Dynamically calculates Total Balance, Total Income, and Total Expenses based on the active ledger.
- **Data Visualization:** Includes a time-based "Cash Flow & Trend" line chart and a categorical "Expense Breakdown" doughnut chart.

### 2. Transactions Explorer
- **Deep Ledger:** A fully populated table displaying all raw transaction details (Date, Amount, Category, Type).
- **Interactivity:** Users can filter the list strictly by "Income" or "Expense", or utilize the robust text search to locate specific descriptions or categories instantly.

### 3. Role-Based Access Control (Simulated)
- **Role Toggle:** Users can switch roles dynamically within the `Settings` panel.
- **Admin (`Zorvyn Admin`):** Has explicit system access to utilize the "New Entry" modal to add mock data, and can delete rows from the interactive table.
- **Viewer (`Aadil`):** Enjoys read-only access. Write/Delete functionality is cleanly removed from the UI.

### 4. Semantic Insights
- The dashboard calculates valuable intelligence automatically: It identifies the user's highest spending category and projects a "Smart Objective" highlighting potential savings yields if that category's spending is reduced by 15%.

### 5. Efficient State Management
- **Centralized Logic:** `Context API` paired with `useReducer` acts as the single source of truth for the entire application (`FinanceContext.tsx`).
- It seamlessly manages the transaction payload, user roles, active tabs, and global theme configurations without the bloat of external stores like Redux.

---

## 🌟 Optional Enhancements Included

To push the interface further, I implemented several advanced touches:
- **Deep Dark Mode Toggle:** A complex theme system toggles between a bright mesh gradient and a deep, luxurious dark layout instantly.
- **Persistent Storage:** Browser `localStorage` is implemented via context hooks. Both the user's preferred theme and any modifications to the core transaction ledger persist across browser reloads!
- **Data Export:** Built-in extraction logic allows administrators or viewers to export the localized dashboard ledger as a `.json` blob directly to their system.
- **Intelligent Formatting:** `Intl.NumberFormat` is implemented strictly across all tables and cards to ensure precise currency formatting (INR `₹`).
