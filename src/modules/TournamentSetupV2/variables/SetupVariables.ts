import type { GenderType, NationType, RarityType, VisionType, WeaponType } from "@mytypes/Character";
import type { TournamentTypeOption } from "@mytypes/config";

export const tournamentOptions = <TournamentTypeOption[]>[
  { label: "League Format", value: "League", icon: "league" },
  { label: "Single Round Robin", value: "RoundRobin", icon: "round-robin" },
  { label: "Knockout Bracket", value: "Elimination", icon: "elimination" },
  { label: "Groups + Knockout", value: "GroupsElimination", icon: "groups-elimination" },
  { label: "Swiss System", value: "Swiss", icon: "swiss" },
  { label: "Double Elimination", value: "DoubleElimination", icon: "double-elimination" },
  { label: "Regional Groups", value: "RegionalGroups", icon: "regional-groups" },
];

export const nativeCategories = ["HP", "ATK", "DEF"];

export const visions: VisionType[] = ["Anemo", "Geo", "Electro", "Dendro", "Hydro", "Pyro", "Cryo"];
export const nations: NationType[] = ["Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontaine", "Natlan", "Snezhnaya"];
export const weapons: WeaponType[] = ["Sword", "Claymore", "Bow", "Polearm", "Catalyst"];
export const genders: GenderType[] = ["Male", "Female"];
export const rarities: RarityType[] = [5, 4];
