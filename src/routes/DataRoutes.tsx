import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { ErrorPage } from "../pages/ErrorPage";
import { TournamentPage } from "../pages/TournamentPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tournament",
    element: <TournamentPage />,
    errorElement: <ErrorPage />,
  },
]);
