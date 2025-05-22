import { useTournamentStoreForm } from "@modules/TournamentSetup/hooks/useTournamentStoreForm";
import { memo } from "react";
import { TypeCard } from "./TypeCard";
import { tournamentOptions } from "@modules/TournamentSetup/variables/SetupVariables";
import { TypePreview } from "./TypePreview";

export const TypeSlide = memo(() => {
  const { type, handleChangeType } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5 text-center justify-center h-full animate-fade-in px-8">
      <h3 className="text-4xl font-semibold text-white">SELECT THE TOURNAMENT TYPE</h3>
      <div className="flex flex-col items-center mt-10">
        <p className="leading-loose text-lg max-w-3xl text-gray-300">
          Choose your preferred tournament structure,
          <span className="text-amber-400"> each format offers unique rules and challenges</span>,so pick the one that best fits your competition!
        </p>
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
        <TypePreview selectedType={type} />
      </div>
    </div>
  );
});
