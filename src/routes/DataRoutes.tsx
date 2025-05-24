import { restrictAccess } from "@helpers/authLoader";
import { TournamentLayout } from "@layouts/TournamentLayout";
import { ErrorPage } from "@pages/ErrorPage";
import { LandingPage } from "@pages/LandingPage";
import { TournamentCategories } from "@pages/TournamentCategories";
import { TournamentCharacters } from "@pages/TournamentCharacters";
import { TournamentHome } from "@pages/TournamentHome";
import { TournamentSettings } from "@pages/TournamentSettings";
import { TournamentMatches } from "@pages/TournamentMatches";
import { TournamentTable } from "@pages/TournamentTable";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <TournamentLayout />,
    errorElement: <ErrorPage />,
    loader: restrictAccess,
    children: [
      {
        path: "/tournament/home",
        element: <TournamentHome />,
      },
      {
        path: "/tournament/table",
        element: <TournamentTable />,
      },
      {
        path: "/tournament/matches",
        element: <TournamentMatches />,
      },
      {
        path: "/tournament/characters",
        element: <TournamentCharacters />,
      },
      {
        path: "/tournament/categories",
        element: <TournamentCategories />,
      },
      {
        path: "/tournament/settings",
        element: <TournamentSettings />,
      },
    ],
  },
  {},
]);
