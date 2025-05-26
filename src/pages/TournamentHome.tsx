import { useTournament } from "@hooks/useTournament";
import { Home } from "@modules/TournamentHome/components/Home";
import { HomeTutorial } from "@modules/TournamentHome/components/HomeTutorial";
import { useMatchSimulation } from "@modules/TournamentHome/hooks/useMatchSimulation";

export const TournamentHome = () => {
  const { tournamentStarted } = useTournament();
  const { simulatingFixture, handleSimulateRound, handleContinueNextRound } = useMatchSimulation();

  return (
    <div className={`${simulatingFixture ? "absolute h-screen w-screen top-0 left-0 bg-gray-950 z-100 overflow-y-auto overflow-x-hidden" : "flex flex-grow-1"} `}>
      {tournamentStarted ? (
        <Home
          simulatingFixture={simulatingFixture}
          handleSimulateRound={handleSimulateRound}
          handleContinueNextRound={handleContinueNextRound}
        />
      ) : (
        <HomeTutorial />
      )}
    </div>
  );
};
