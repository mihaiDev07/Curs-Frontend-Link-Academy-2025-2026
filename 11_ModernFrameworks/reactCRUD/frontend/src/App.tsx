import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactNode } from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductFormPage from "./pages/ProductFormPage";
import Products from "./pages/Products";
import Users from "./pages/Users";
import UserFormPage from "./pages/UserFormPage";
import VeziCos from "./pages/VeziCos";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import ProductsListPage from "./pages/ProductsListPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface AdminRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter basename="/proiect_frontend">
      <div className="app-shell">
        <Header />

        <main className="container py-4 app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/veziCos"
              element={<VeziCos />}
            />
            <Route path="/products/:id" element={<ProductFormPage mode="view" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productsList" element={<ProductsListPage />} />
            <Route
              path="/adminProducts"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-orders"
              element={
                <AdminRoute>
                  <AdminOrdersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/users/:id/edit"
              element={
                <AdminRoute>
                  <UserFormPage />
                </AdminRoute>
              }
            />
            <Route
              path="/my-profile/edit"
              element={
                <ProtectedRoute>
                  <UserFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/new"
              element={
                <AdminRoute>
                  <ProductFormPage mode="create" />
                </AdminRoute>
              }
            />
          
            <Route
              path="/products/:id/edit"
              element={
                <AdminRoute>
                  <ProductFormPage mode="edit" />
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;