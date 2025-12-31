// src/app/router.jsx
import { createBrowserRouter } from "react-router-dom";

// Layout principal
import Layout from "../shared/components/Layout";

// Protected route
import ProtectedRoute from "../shared/components/ProtectedRoute";

// Auth pages
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import HomePage from "../features/home/HomePage";
import BudgetListPage from "../features/budgets/pages/BudgetListPage";
import ExpenseListPage from "../features/expenses/pages/ExpenseListPage";
/*
// User pages
import ProfilePage from "../features/user/pages/ProfilePage";

// Budget pages
import BudgetListPage from "../features/budgets/pages/BudgetListPage";
/*
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

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedRoute>
    ),
  },

  // ------------------------------
  // Ruta de prueba (sin autenticación)
  // ------------------------------

  {
    path: "/budgets",
    element: (
      <ProtectedRoute>
        <Layout>
          <BudgetListPage />
        </Layout>
      </ProtectedRoute>
    ),
  },

  {
    path: "/expenses/:budgetId",
    element: (
      <ProtectedRoute>
        <Layout>
          <ExpenseListPage />
        </Layout>
      </ProtectedRoute>
    ),
  },

  // ------------------------------
  // Rutas privadas
  // ------------------------------
  /*
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),

    // Hijos del Layout
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      // BUDGETS
      {
        path: "budgets",
        element: <BudgetListPage />,
      },
    ],
  },*/
]);
