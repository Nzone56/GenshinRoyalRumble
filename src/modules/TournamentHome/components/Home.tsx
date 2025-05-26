import { TablePreview } from "./TablePreview";
import { LastFixturePreview } from "./LastFixturePreview";
import { FixturePreview } from "./FixturePreview";
import { StartFixture } from "./StartFixture";
import { useState } from "react";
import { FixtureResults } from "./SimulateFixture/FixtureResults";

export const Home = () => {
  const [simulatingFixture, setSimulatingFixture] = useState(false);
  return (
    <div className="flex flex-col w-full m-8 gap-8">
      {simulatingFixture ? (
        <FixtureResults />
      ) : (
        <>
          <div className="flex items-center justify-between w-full gap-8">
            <TablePreview />
            <LastFixturePreview />
          </div>
          <FixturePreview />
          <StartFixture handleStartFixture={() => setSimulatingFixture(true)} />
        </>
      )}
    </div>
  );
};
