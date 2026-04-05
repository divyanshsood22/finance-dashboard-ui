# 🌐 Finance Dashboard UI

An interactive finance dashboard with a cool and minimal landing page, built with React, TypeScript, and Tailwind CSS.

<br>

## 💠 Tech Stack

▫️Frontend : React + TypeScript <br>
▫️Styling : Tailwind CSS <br>
▫️Charts: Recharts <br>
▫️Icons: Lucide React<br>
▫️DataBase : Local Storage<br>
▫️Theme : Shadcn-UI


> [!NOTE]
> This is a frontend-only application with client-side state management and local storage for data persistence.

<br>

## 🟢 Live Demo
[Finance DashBoard UI](https://divyanshsood22.github.io/finance-dashboard-ui/)

<br>

> [!IMPORTANT]
> **Admin Credentials :-** <br> Username : `sood` <br> Password : `zorvyn`

<br>

## 💠 Features

- A modern, responsive landing page with gradient animations, a bento grid layout, and smooth scrolling elements made with Tailwind CSS and custom animations.

- A login system for users and admins that uses React Context and localStorage to handle sessions open and validate users securely.

- An interactive dashboard with summary cards, recent transactions, and different types of charts (area, pie, line, and bar) powered by Recharts to give clear financial insights.

- Full CRUD functionality for transactions (only for admins) with forms that pop up, categorization, and UI updates in real time.

- Using JavaScript logic and date-fns to do things like track spending trends, break down categories, compare months, and find averages.

- Managing data on the client side with localStorage, global state with the Context API, and fast data processing with built-in JS methods.

<br>

## ⚙️ Setup - To Run Locally
> **Step 1 :** Clone / Fork this repo

> **Step 2 :** Install Dependencies
```bash
npm install
```

> **Step 3 :** Run the vite dev server
```bash
npm run dev
```

<br>

## 💠 Project Architecture
```
src/
├── app/
│   ├── components/
│   │   ├── AddTransactionModal.tsx   # Add transaction form
│   │   ├── AdminLoginModal.tsx       # Admin Login Modal
│   │   ├── Dashboard.tsx             # Main dashboard layout
│   │   ├── DashboardOverview.tsx     # Overview tab with charts
│   │   ├── EditTransactionModal.tsx  # Edit transaction form
│   │   ├── InsightsSection.tsx       # Insights tab with observations
│   │   ├── LandingPage.tsx           # Landing page with auth options
│   │   ├── LoginModal.tsx            # Login modal component
│   │   ├── SignupModal.tsx           # Signup modal component
│   │   ├── ThemeToggle.tsx           # Toggle Theme component
│   │   └── TransactionsSection.tsx   # Transactions tab with filtering
│   ├── contexts/
│   │   ├── AppContext.tsx            # Global state management
│   │   └── ThemeContext.tsx          # Theme management
│   └── App.tsx                       # Root component
└── styles/
    ├── theme.css                     # Theme utlilities & variables
    └── fonts.css                     # Font imports
```

<br>
