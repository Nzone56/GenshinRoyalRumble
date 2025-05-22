import { useTournamentStoreForm } from "@modules/TournamentSetup/hooks/useTournamentStoreForm";
import type { EvaluationTypeOption } from "@mytypes/config";

type EvaluationTypeCardProps =  {
  type: EvaluationTypeOption
}

export const EvaluationTypeCard = ({type} : EvaluationTypeCardProps) => {

  const { evaluationType, handleChangeEvaluation } = useTournamentStoreForm()
  const isSelected = evaluationType === type.key

  return (
  <div className={`${isSelected ? "border-amber-500" : "border-gray-200"} flex flex-col flex-grow max-w-2xl items-start border-2  cursor-pointer rounded p-4`} onClick={() => handleChangeEvaluation(type.key)}>
    <h2 className={`${isSelected ? "text-amber-500" : "text-gray-200"} text-lg`}>{type.name}</h2>
    <p className="text-justify text-sm">{type.description} {type.key !== "random" && <span className="text-amber-200">COMING SOON</span>}</p>
  </div>
)
};
