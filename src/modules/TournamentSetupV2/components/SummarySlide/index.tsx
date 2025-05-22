import { useTournamentStoreForm } from "@modules/TournamentSetupV2/hooks/useTournamentStoreForm";
import { tournamentOptions } from "@modules/TournamentSetupV2/variables/SetupVariables";
import { memo } from "react";
import { evaluationTypes } from "../EvaluationTypeSlide.tsx/EvaluationTypeVariables";

export const SummarySlide = memo(() => {
  const { name, type, characters, categories, evaluationType, handleStartTournament } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5 text-center justify-center h-full animate-fade-in">
      <h3 className="text-4xl font-semibold text-white">THIS IS YOUR TOURNAMENT</h3>
      <div className="flex flex-col items-center mt-10">
        <p className="leading-loose text-xl max-w-3xl text-gray-300">
          You're about to start a <span className="text-amber-400 font-semibold">{tournamentOptions.find(option => option.value === type)?.label}</span> tournament called{" "}
          <span className="text-amber-400 font-bold">{name}</span>.
        </p>
        <p className="leading-loose text-xl max-w-3xl text-gray-300">
          It includes <span className="text-amber-400 font-bold">{characters.length}</span> characters and{" "}
          <span className="text-amber-400 font-bold">{categories.length}</span> categories to be evaluated.
        </p>
        <p className="leading-loose text-xl max-w-3xl text-gray-300">
          The evaluation method will be:{" "}
          <span className="text-amber-400 font-semibold">{evaluationTypes.find(option => option.key === evaluationType)?.name}</span>.
        </p>

        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            type="button"
            onClick={handleStartTournament}
            className="px-8 py-3 bg-amber-400 rounded-xl hover:scale-110 transition duration-300ms text-white font-semibold cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
});
