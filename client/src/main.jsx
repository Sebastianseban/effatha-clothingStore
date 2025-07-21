import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage.jsx";
import NewArrivals from "./pages/NewArrivals.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminProductsPage from "./pages/admin/AdminProductsPage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import UserProfilePage from "./pages/user/userProfilePage.jsx";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./pages/user/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/user/OrderSuccessPage.jsx";

const queryClient = new QueryClient();


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "collections", element: <CollectionPage /> },
      { path: "collections/newArrivals", element: <NewArrivals /> },

      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },

      { path: "product/:slug", element: <ProductPage /> },
      { path: "account", element: <UserProfilePage /> },
      { path: "checkout", element: <CheckoutPage/> },
      { path: "order-success", element: <OrderSuccessPage/> },
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoute requiredRole="admin" />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "admin-products", element: <AdminProductsPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
