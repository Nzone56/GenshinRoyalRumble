import { useTournament } from "@hooks/useTournament";
import { Home } from "@modules/TournamentHome/components/Home";
import { HomeTutorial } from "@modules/TournamentHome/components/HomeTutorial";

export const TournamentHome = () => {
  const { tournamentStarted } = useTournament();

  return <div className="flex flex-grow-1">{tournamentStarted ? <Home /> : <HomeTutorial />}</div>;
};
