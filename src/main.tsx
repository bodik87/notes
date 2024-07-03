import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ArticlePage from "./pages/article-page";
import ChapterPage from "./pages/chapter-page";
import QuickNotePage from "./pages/quick-note-page";
import UserPage from "./pages/user-page";
import FolderPage from "./pages/folder-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quick-notes/:id",
    element: <QuickNotePage />,
  },
  {
    path: "/chapter/:id",
    element: <ChapterPage />,
  },
  {
    path: "/folders/:id",
    element: <FolderPage />,
  },
  {
    path: "/articles/:id",
    element: <ArticlePage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
