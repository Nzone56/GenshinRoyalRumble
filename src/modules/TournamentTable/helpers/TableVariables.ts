import type { TableColumn } from "../hooks/useTableFilters";

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
