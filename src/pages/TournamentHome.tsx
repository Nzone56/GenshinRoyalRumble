import { useEffect, useState } from "react";
import { useTournament } from "@hooks/useTournament";
import { Home } from "@modules/TournamentHome/components/Home";
import { HomeTutorial } from "@modules/TournamentHome/components/HomeTutorial";
import { useMatchSimulation } from "@modules/TournamentHome/hooks/useMatchSimulation";

export const TournamentHome = () => {
  const { tournamentStarted } = useTournament();
  const { simulatingFixture, handleSimulateRound, handleContinueNextRound } = useMatchSimulation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`${
        simulatingFixture
          ? "absolute h-screen w-screen top-0 left-0 bg-gray-950 z-100 overflow-y-auto overflow-x-hidden"
          : "flex flex-grow-1"
      }`}
    >
      <div
        className={`w-full transition-all duration-500 ease-out transform ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
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
    </div>
  );
};
