import type { TournamentType, TournamentTypeOption } from "@mytypes/config";
import LEAGUE from "@assets/images/icons/tournament/league.svg?react";
import ROUNDROBIN from "@assets/images/icons/tournament/round-robin.svg?react";
import ELIMINATION from "@assets/images/icons/tournament/knockout.svg?react";
import GROUPSELIMINATION from "@assets/images/icons/tournament/groups-elimination.svg?react";
import SWISS from "@assets/images/icons/tournament/swiss.svg?react";
import DOUBLEELIMINATION from "@assets/images/icons/tournament/double-elimination.svg?react";
import REGIONALGROUPS from "@assets/images/icons/tournament/regional-groups.svg?react";

type TypeCardProps = {
  type: TournamentTypeOption;
  handleSelectType: (type: TournamentType) => void;
  isSelected: boolean;
};

export const TypeCard = ({ type, handleSelectType, isSelected }: TypeCardProps) => {

  const iconClasses = `${isSelected ? "fill-amber-400" : "fill-gray-200"} w-8 h-8 mb-2`
  const TypeIcons = {
    league: <LEAGUE className={iconClasses} />,
    roundRobin: <ROUNDROBIN className={iconClasses} />,
    elimination: <ELIMINATION className={iconClasses} />,
    groupsElimination: <GROUPSELIMINATION className={iconClasses} />,
    swiss: <SWISS className={iconClasses} />,
    doubleElimination: <DOUBLEELIMINATION className={iconClasses} />,
    regionalGroups: <REGIONALGROUPS className={iconClasses} />,
  };

  return (
    <div
      className={`${isSelected ? "border-amber-400 text-amber-400" : "border-gray-200 "} border-2 rounded-lg p-2 flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer min-w-[10px] max-w-[100px] h-[150px]`}
      onClick={() => handleSelectType(type.value)}
    >
      {TypeIcons[type.icon as keyof typeof TypeIcons]}
      <span className="text-xs">{type.label}</span>
    </div>
  );
};
