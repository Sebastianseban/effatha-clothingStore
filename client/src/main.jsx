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

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "collections",
        element: <CollectionPage />,
      },
      {
        path: "collections/newArrivals",
        element: <NewArrivals />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
