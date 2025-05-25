import { RoundMatches } from "@modules/TournamentMatches/components/RoundMatches";
import { RoundTabs } from "@modules/TournamentMatches/components/RoundTabs";

export const TournamentMatches = () => {
  return (
    <div className="flex-flex-col m-8">
      <h3 className="text-2xl">Fixtures</h3>
      <RoundTabs />
      <RoundMatches />
    </div>
  );
};
