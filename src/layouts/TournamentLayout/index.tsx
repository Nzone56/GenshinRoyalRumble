
import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournament } from "@hooks/useTournament";

export const TournamentLayout = () => {
  const { loading } = useTournament()

  if (loading) return <LoadingLogo />;

  return (
    <div className="flex flex-col p-5 text-center bg-gray-950 w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};
