import type { TournamentType, TournamentTypeOption } from "@mytypes/config";
import CHECK from "@assets/images/icons/check.svg?react";

type TypeCardProps = {
  type: TournamentTypeOption;
  handleSelectType: (type: TournamentType) => void;
  isSelected: boolean;
};

export const TypeCard = ({ type, handleSelectType, isSelected }: TypeCardProps) => {
  return (
    <div
      className={`${isSelected ? "border-amber-500" : "border-gray-200 "} border-2 rounded-lg p-2 flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer min-w-[10px] max-w-[150px] h-[200px]`}
      onClick={() => handleSelectType(type.value)}
    >
      <CHECK className="w-4 h-4 fill-blue-500 mb-2" />
      <span className="text-sm">{type.label}</span>
    </div>
  );
};
