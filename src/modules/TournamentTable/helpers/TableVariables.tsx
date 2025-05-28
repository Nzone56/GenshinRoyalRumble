import type { CharacterStats } from "@mytypes/Tournament";
import type { TableColumn } from "../hooks/useTableFilters";
import LINE from "@assets/images/icons/line.svg?react";
import ARROWUP from "@assets/images/icons/arrow-up.svg?react";
import ARROWDOWN from "@assets/images/icons/arrow-down.svg?react";

export const columns: { key: TableColumn; label: string }[] = [
  { key: "nation", label: "Nation" },
  { key: "vision", label: "Vision" },
  { key: "weapon", label: "Weapon" },
  { key: "icon", label: "Icon" },
  { key: "name", label: "Character" },
  { key: "battles", label: "PJ" },
  { key: "wins", label: "W" },
  { key: "draws", label: "D" },
  { key: "losses", label: "L" },
  { key: "pointsF", label: "PF" },
  { key: "pointsA", label: "PA" },
  { key: "diffP", label: "PD" },
  { key: "points", label: "PTS" },
];

export const getPrevPositionIcon = (character: CharacterStats) => {
  if (character.prevPosition == null || character.prevPosition === character.position) {
    return <LINE className="w-8 h-8 rounded-full fill-gray-300" />;
  }

  if (character.prevPosition > character.position) {
    return <ARROWUP className="w-8 h-8 rounded-full fill-green-400" />;
  }

  return <ARROWDOWN className="w-8 h-8 rounded-full fill-red-400" />;
};
