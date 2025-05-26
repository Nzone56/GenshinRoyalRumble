import { memo } from "react";
import { evaluationTypes } from "./EvaluationTypeVariables";
import { EvaluationTypeCard } from "./EvaluationTypeCard";

export const EvaluationTypeSlide = memo(() => {
  return (
    <div className="flex flex-col items-center mb-5 text-center justify-center h-full animate-fade-in px-8">
      <h3 className="text-4xl  text-white">SELECT THE TOURNAMENT EVALUATION TYPE</h3>
      <div className="flex flex-col items-center mt-10">
        <p className="leading-loose text-lg max-w-3xl text-gray-300">
          Now, choose how matches will be evaluated in your tournament.
          <span className="text-amber-400"> Each method offers distinct rules and strategic depth</span>, so pick the
          one that best matches your vision for the competition!
        </p>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-4 mt-12">
          {evaluationTypes.map((type) => (
            <EvaluationTypeCard key={type.key} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
});
