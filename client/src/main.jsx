import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SearchResultsPage from "./pages/user/SearchResultsPage.jsx";

// Lazy imports
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const CollectionPage = lazy(() => import("./pages/CollectionPage.jsx"));
const NewArrivals = lazy(() => import("./pages/NewArrivals.jsx"));
const LoginPage = lazy(() => import("./pages/Loginpage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUp.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const UserProfilePage = lazy(() => import("./pages/user/userProfilePage.jsx"));
const CheckoutPage = lazy(() => import("./pages/user/CheckoutPage.jsx"));
const OrderSuccessPage = lazy(() => import("./pages/user/OrderSuccessPage.jsx"));
const OrderHistoryPage = lazy(() => import("./pages/user/OrderHistoryPage.jsx"));
const BestSellers = lazy(() => import("./pages/user/BestSellers.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProductsPage.jsx"));

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "collections", element: <CollectionPage /> },
//       { path: "collections/new-arrivals", element: <NewArrivals /> },
//       { path: "collections/best-sellers", element: <BestSellers /> },
//       {
//         path: "signup",
//         element: (
//           <PublicRoute>
//             <SignUpPage />
//           </PublicRoute>
//         ),
//       },
//       {
//         path: "login",
//         element: (
//           <PublicRoute>
//             <LoginPage />
//           </PublicRoute>
//         ),
//       },
//       { path: "product/:slug", element: <ProductPage /> },
//       { path: "account", element: <UserProfilePage /> },
//       { path: "checkout", element: <CheckoutPage /> },
//       { path: "order-success", element: <OrderSuccessPage /> },
//       { path: "order-history", element: <OrderHistoryPage /> },
//       { path: "search", element: <SearchResultsPage/>},
//     ],
//   },
//   {
//     path: "/admin",
//     element: <ProtectedRoute requiredRole="admin" />,
//     children: [
//       {
//         path: "",
//         element: <AdminLayout />,
//         children: [
//           { path: "", element: <AdminDashboard /> },
//           { path: "admin-products", element: <AdminProductsPage /> },
//         ],
//       },
//     ],
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public pages
      { path: "/", element: <HomePage /> },
      { path: "collections", element: <CollectionPage /> },
      { path: "collections/new-arrivals", element: <NewArrivals /> },
      { path: "collections/best-sellers", element: <BestSellers /> },
      { path: "search", element: <SearchResultsPage /> },

      // Auth pages (public only)
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

      // Product detail (public)
      { path: "product/:slug", element: <ProductPage /> },

      // User-only pages
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order-history",
        element: (
          <ProtectedRoute>
            <OrderHistoryPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Admin-only section
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
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
