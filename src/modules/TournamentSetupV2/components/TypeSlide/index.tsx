import { useTournamentStoreForm } from "@modules/TournamentSetupV2/hooks/useTournamentStoreForm";
import { memo } from "react";
import { TypeCard } from "./TypeCard";
import { tournamentOptions } from "@modules/TournamentSetupV2/variables/SetupVariables";

export const TypeSlide = memo(() => {
  const { type, handleChangeType } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5 text-center justify-center h-full animate-fade-in">
      <h3 className="text-4xl font-semibold text-white">SELECT THE TOURNAMENT TYPE</h3>
      <div className="flex flex-col items-center mt-10">
        <p className="leading-loose text-xl max-w-3xl text-gray-300">
          text text text
          <span className="text-amber-400"> amber text amber text</span>, more final text!
        </p>
        {/* <FormSelect id="tournament_type" name="type" value={type} onChange={handleChangeForm}>
          {tournamentTypes.map((tournamentType) => (
            <option
              id={tournamentType}
              key={tournamentType}
              value={tournamentType}
              disabled={tournamentType !== "League"}
            >
              {tournamentType}
            </option>
          ))}
        </FormSelect> */}
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 mt-12">
          {tournamentOptions.map((option) => (
            <TypeCard
              key={option.value}
              type={option}
              handleSelectType={handleChangeType}
              isSelected={type === option.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
