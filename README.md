## ⚖️ Assumptions & Limitations

- **State Management**:  Uses local component state and Prop Drilling for simplicity, as the app's scope doesn't yet require a global state manager like Redux or Zustand.
- **Auth**: Currently designed as a public-access dashboard (No Login/Sign-up flow implemented).

## 🚀 Key Features

- **Dynamic Dashboard**: Real-time overview of total employees, department distribution, and attendance rates.
- **Employee Management**: Full CRUD operations for employee profiles with instant search and filtering.
- **Attendance Tracking**: Simplified interface for marking daily attendance and viewing historical logs.
- **Responsive Analytics**: Visual data representation using custom-built charts (Donut, MiniBar).
- **Premium UI/UX**: Dark-themed, glassmorphic design with smooth micro-animations and seamless transitions.
- **Mobile First**: Fully responsive layout optimized for mobile, tablet, and desktop screens.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core**: React 19 
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express.js, 
- **ORM**: Mongoose,
- **Validation**: Zod,
- **Database**: MongoDB
- **Icons**: Lucide Icons integration
- **HTTP Client**: Axios with centralized error handling
## 📦 Project Structure

```text
frontend/
├── app/                # Next.js App Router (Pages & Layout)
├── components/         # Shared UI & Layout components
├── constants/          # Application constants & theme tokens
├── features/           # Modularized feature components (Employees, Attendance, Dashboard)
├── hooks/              # Custom React hooks (useWindowWidth, useDebounce)
├── public/             # Static assets
├── services/           # API service layer (Axios clients)
└── types/              # TypeScript interfaces & types
```

## 🏗 Setup & Installation

### Prerequisites

- **Node.js**: 20.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn

### Steps

1. **Clone and Install**:
   ```bash
   pnpm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://hrms-lite-api-yaqx.onrender.com/api/v1
   ```

3. **Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

4. **Build for Production**:
   ```bash
   pnpm build
   pnpm start
   ```

## 📋 Requirements Fulfilled

This project includes:
- **Project overview**: Clearly documented in the header and features list.
- **Tech stack used**: Detailed breakdown in the Technology Stack section.
- **Steps to run locally**: Step-by-step setup guide provided above.
- **Assumptions or limitations**: Documented in the dedicated section below.

## 🔗 API Documentation

The frontend communicates with a backend API. All requests use JSON.

### Employees

- **`GET /employees`**: List all employees.
  - Query Params: `search` (name/id), `page`, `limit`.
- **`GET /employees/:id`**: Get detailed info for a specific employee.
- **`POST /employees`**: Create a new employee record.
- **`PATCH /employees/:id`**: Update an existing employee.
- **`DELETE /employees/:id`**: Remove an employee and their related attendance records.

### Attendance

- **`GET /attendance`**: List attendance logs.
  - Query Params: `employeeId`, `status` (Present/Absent), `from`, `to`, `page`, `limit`.
- **`POST /attendance`**: Log attendance for an employee.

### Statistics

- **`GET /stats/summary`**: Get overall HR metrics.
- **`GET /stats/present-days`**: Get attendance frequency data for distribution charts.
