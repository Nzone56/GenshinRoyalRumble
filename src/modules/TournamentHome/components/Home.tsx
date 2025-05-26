import { TablePreview } from "./TablePreview";
import { LastFixturePreview } from "./LastFixturePreview";
import { FixturePreview } from "./FixturePreview";
import { StartFixture } from "./StartFixture";
import { FixtureResults } from "./SimulateFixture/FixtureResults";
import { useScheduleStore } from "@store/useScheduleStore";
import { Winner } from "./Winner";

type Props = {
  simulatingFixture: boolean;
  handleSimulateRound: () => void;
  handleContinueNextRound: () => void;
};

export const Home = ({ simulatingFixture, handleSimulateRound, handleContinueNextRound }: Props) => {
  const { currentRound, schedule } = useScheduleStore();
  if (!schedule) return <span>Unexpected Error</span>;

  return (
    <div className={`${simulatingFixture ? "absolute h-screen w-screen " : "flex flex-col w-full m-8 gap-8"} `}>
      {simulatingFixture ? (
        <FixtureResults handleContinueNextRound={handleContinueNextRound} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          {currentRound > schedule?.rounds.length && <Winner />}
          <div className="flex items-center justify-between w-full ">
            <TablePreview />
            <LastFixturePreview />
          </div>

          {schedule?.rounds.length && currentRound < schedule?.rounds.length && (
            <>
              <FixturePreview />
              <StartFixture handleStartFixture={handleSimulateRound} />
            </>
          )}
        </div>
      )}
    </div>
  );
};
