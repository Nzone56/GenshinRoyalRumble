import { FixtureMatch } from "@modules/TournamentHome/components/SimulateFixture/FixtureMatch";
import type { Match } from "@mytypes/Tournament";

type detailedMatchProps = {
  match: Match;
  setSelectedMatch: (match: Match | null) => void;
};

export const DetailedMatch = ({ match, setSelectedMatch }: detailedMatchProps) => {

  return (
    <div className="fade-in-up">
      <button
        type="button"
        className={`mt-4 px-4 py-2 rounded-xl text-white  transition duration-300 bg-amber-400 hover:scale-110 cursor-pointer`}
        onClick={() => setSelectedMatch(null)}
      >
        Go back
      </button>
      <FixtureMatch match={match} />
    </div>
  );
};
