import type { GenderType, NationType, RarityType, VisionType, WeaponType } from "@mytypes/Character";
import type { TournamentTypeOption } from "@mytypes/Config";

export const tournamentOptions = <TournamentTypeOption[]>[
  { label: "League Format", value: "League", icon: "league" },
  { label: "Single Round Robin", value: "RoundRobin", icon: "roundRobin" },
  { label: "Knockout Bracket", value: "Elimination", icon: "elimination" },
  { label: "Groups + Knockout", value: "GroupsElimination", icon: "groupsElimination" },
  { label: "Swiss System", value: "Swiss", icon: "swiss" },
  { label: "Double Elimination", value: "DoubleElimination", icon: "doubleElimination" },
  { label: "Regional Groups", value: "RegionalGroups", icon: "regionalGroups" },
];

export const nativeCategories = ["HP", "ATK", "DEF"];

export const visions: VisionType[] = ["Anemo", "Geo", "Electro", "Dendro", "Hydro", "Pyro", "Cryo"];
export const nations: NationType[] = ["Mondstadt", "Liyue", "Inazuma", "Sumeru", "Fontaine", "Natlan", "Snezhnaya"];
export const weapons: WeaponType[] = ["Sword", "Claymore", "Bow", "Polearm", "Catalyst"];
export const genders: GenderType[] = ["Male", "Female"];
export const rarities: RarityType[] = [5, 4];

const isPowerOfTwo = (n: number) => (n & (n - 1)) === 0 && n !== 0;
const isEven = (n: number) => n % 2 === 0;
const isMultipleOf = (n: number, factor: number) => n % factor === 0;

export const charactersValidationRules: Record<string, (count: number) => { isValid: boolean; message: string }> = {
  League: (count) => {
    if (count < 4) return { isValid: false, message: "Minimum 4 players required." };
    if (!isEven(count)) return { isValid: false, message: "Number must be even (4, 6, 8...)." };
    return { isValid: true, message: "" };
  },
  RoundRobin: (count) => {
    if (count < 4) return { isValid: false, message: "Minimum 4 players required." };
    if (!isEven(count)) return { isValid: false, message: "Number must be even (4, 6, 8...)." };
    return { isValid: true, message: "" };
  },
  Elimination: (count) => {
    if (!isPowerOfTwo(count) || count < 4)
      return { isValid: false, message: "Players must be 4, 8, 16, 32 (power of 2)." };
    return { isValid: true, message: "" };
  },
  DoubleElimination: (count) => {
    if (!isPowerOfTwo(count) || count < 4)
      return { isValid: false, message: "Players must be 4, 8, 16, 32 (power of 2)." };
    return { isValid: true, message: "" };
  },
  GroupsElimination: (count) => {
    if (count < 8 || !isEven(count)) return { isValid: false, message: "Minimum 8 players, and must be even." };
    return { isValid: true, message: "" };
  },
  Swiss: (count) => {
    if (count < 4) return { isValid: false, message: "Minimum 4 players required." };
    return { isValid: true, message: "" };
  },
  RegionalGroups: (count) => {
    if (count < 8 || !isMultipleOf(count, 4)) return { isValid: false, message: "Must be 8, 16, 32 (multiples of 4)." };
    return { isValid: true, message: "" };
  },
};
