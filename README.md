# WM Manager — Frontend

> Service management web application — React, TypeScript, AWS Cognito, React Query, TailwindCSS.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()
[![AWS Cognito](https://img.shields.io/badge/AWS_Cognito-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)]()

---

## Overview

Frontend for the WM Manager service management platform. Provides secure authentication via AWS Cognito, an interactive dashboard with charts, and a data table for full service CRUD operations.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript 5.8 | UI framework |
| Vite 6.3 | Build tool & dev server |
| React Router 7.6 | Client-side routing |
| TanStack React Query 5 | Server state management |
| AWS Cognito + OIDC | Authentication |
| Axios | HTTP client |
| TailwindCSS 3.3 | Styling |
| Chart.js | Dashboard charts |
| React Toastify | Notifications |

---

## Features

### Authentication & Security
- Secure login via AWS Cognito
- User registration with data validation
- Email-based account confirmation
- Route protection with AuthGuard
- Automatic session management with token refresh

### Dashboard
- Real-time data visualization
- Interactive charts with Chart.js
- KPI summary cards
- Fully responsive layout

### Service Manager
- Data table with advanced filters
- Create, view, update, and delete services
- User-friendly interface

---

## Project Structure

```
src/
├── components/
│   ├── AuthGuard.tsx        # Route protection
│   ├── Header/
│   ├── Footer/
│   └── Loader/
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── ConfirmAccount/
│   ├── Dashboard/           # Charts and KPIs
│   └── Table/               # Service manager
├── layouts/
│   ├── AuthLayout.tsx       # Public pages layout
│   └── MainLayout.tsx       # Protected layout
├── contexts/
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useData.ts
├── services/
│   ├── httpClient.ts        # Axios setup
│   └── servicesData.ts      # API endpoints
├── lib/
│   └── types.ts
└── router/
    └── index.tsx
```

---

## Data Flow

```
React Components
      ↓
Custom Hooks (useAuth, useData)
      ↓
React Query (caching & state)
      ↓
Axios HTTP Client
      ↓
AWS API Gateway → WM Manager API
```

---

## Security

- AWS Cognito handles all credential management
- AuthGuard protects all private routes
- TypeScript enforces type safety throughout
- HTTPS enforced for all API communication

---

## Author

**Gustavo Machado** — [LinkedIn](https://www.linkedin.com/in/gustavo-machado-416326215/) · [GitHub](https://github.com/machadogustavors)
