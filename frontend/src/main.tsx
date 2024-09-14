import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import DiaryPage from "./pages/DiaryPage";
import { ThemeProvider } from "./components/ui/theme-provider";

const router = createBrowserRouter([
  {
    path: "/diary",
    element: <DiaryPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
