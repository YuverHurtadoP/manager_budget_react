// src/app/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layout principal
import Layout from "../shared/components/Layout";

// Protected route
import ProtectedRoute from "../shared/components/ProtectedRoute";

// Auth pages
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
/*
// User pages
import ProfilePage from "../features/user/pages/ProfilePage";

// Budget pages
import BudgetListPage from "../features/budgets/pages/BudgetListPage";
import BudgetCreatePage from "../features/budgets/pages/BudgetCreatePage";
import BudgetEditPage from "../features/budgets/pages/BudgetEditPage";

// Expense pages
import ExpenseListPage from "../features/expenses/pages/ExpenseListPage";
import ExpenseCreatePage from "../features/expenses/pages/ExpenseCreatePage";
import ExpenseEditPage from "../features/expenses/pages/ExpenseEditPage";
*/
// ===============================
// RUTAS
// ===============================

export const router = createBrowserRouter([
  // ------------------------------
  // Rutas públicas
  // ------------------------------
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // ------------------------------
  // Rutas privadas
  // ------------------------------
  /*{
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    // Hijos del Layout
    children: [
      // USER
      {
        path: "profile",
        element: <ProfilePage />,
      },

      // BUDGETS
      {
        path: "budgets",
        element: <BudgetListPage />,
      },
      {
        path: "budgets/create",
        element: <BudgetCreatePage />,
      },
      {
        path: "budgets/:id/edit",
        element: <BudgetEditPage />,
      },

      // EXPENSES
      {
        path: "budgets/:budgetId/expenses",
        element: <ExpenseListPage />,
      },
      {
        path: "budgets/:budgetId/expenses/create",
        element: <ExpenseCreatePage />,
      },
      {
        path: "budgets/:budgetId/expenses/:expenseId/edit",
        element: <ExpenseEditPage />,
      },
    ],
  },*/
]);
