import { ErrorPage } from "@pages/ErrorPage";
import { LandingPage } from "@pages/LandingPage";
import { TournamentPage } from "@pages/TournamentPage";
import { createBrowserRouter } from "react-router-dom";


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
