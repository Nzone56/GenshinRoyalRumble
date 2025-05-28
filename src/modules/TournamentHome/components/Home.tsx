import { TablePreview } from "./TablePreview";
import { LastFixturePreview } from "./LastFixturePreview";
import { FixturePreview } from "./FixturePreview";
import { StartFixture } from "./StartFixture";
import { FixtureResults } from "./SimulateFixture/FixtureResults";
import { useScheduleStore } from "@store/useScheduleStore";
import { Winner } from "./Winner";

//TODO: FIX THE STYLES FOR LG-XL SCREENS
type Props = {
  simulatingFixture: boolean;
  handleSimulateRound: () => void;
  handleContinueNextRound: () => void;
};

export const Home = ({ simulatingFixture, handleSimulateRound, handleContinueNextRound }: Props) => {
  const { currentRound, schedule } = useScheduleStore();
  if (!schedule) return <span>Unexpected Error</span>;

  return (
    <div className={`${simulatingFixture ? "absolute h-screen w-screen " : "flex flex-col w-full"} `}>
      {simulatingFixture ? (
        <FixtureResults handleContinueNextRound={handleContinueNextRound} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          {currentRound > schedule?.rounds.length && <Winner />}
          <StartFixture handleStartFixture={handleSimulateRound} />
          <div className="flex flex-col items-center w-full h-full max-w-[1200px] gap-8">
            <FixturePreview />
            {schedule?.rounds.length && currentRound < schedule?.rounds.length && (
              <div className="flex items-center w-full gap-8">
                <TablePreview />
                <LastFixturePreview />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
