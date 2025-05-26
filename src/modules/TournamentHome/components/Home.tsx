import { TablePreview } from "./TablePreview";
import { LastFixturePreview } from "./LastFixturePreview";
import { FixturePreview } from "./FixturePreview";
import { StartFixture } from "./StartFixture";
import { FixtureResults } from "./SimulateFixture/FixtureResults";
import { useMatchSimulation } from "../hooks/useMatchSimulation";

export const Home = () => {
  const {
    simulatingFixture,
    handleSimulateRound,
    handleContinueNextRound
  } = useMatchSimulation()

  return (
    <div className="flex flex-col w-full m-8 gap-8">
      {simulatingFixture ? (
        <FixtureResults handleContinueNextRound={handleContinueNextRound}/>
      ) : (
        <>
          <div className="flex items-center justify-between w-full gap-8">
            <TablePreview />
            <LastFixturePreview />
          </div>
          <FixturePreview />
          <StartFixture handleStartFixture={handleSimulateRound} />
        </>
      )}
    </div>
  );
};
